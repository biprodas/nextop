import { UserService } from '@admin/user/services/user.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignOptions, TokenExpiredError } from 'jsonwebtoken';
import { RefreshTokenPayload } from '../dtos/refresh-token-payload.dto';
import { CreateRefreshTokenDto } from '../dtos/create-rtoken.dto';
import { UpdateRefreshTokenDto } from '../dtos/update-rtoken.dto';
import { AccessTokenPayload } from '../dtos/access-token-payload.dto';
import { BaseJwtSignOptions } from '../constants/jwt-sign-options';
import { UserDto } from '@admin/user/dtos/user.dto';
import { RefreshTokenDto } from '../dtos/rtoken.dto';
import { ConfigService } from '@nestjs/config';
import { RequestContextDto } from '@common/dtos/request-context.dto';
import { GetAuthTokenInput } from '../dtos/get-auth-token-input.dto';
import { TokenGenerateBy } from '../enums/token-generate-by.enum';
import { RevokeGrant } from '../enums/revoke-grant.enum';
import { TokenRevokeInput } from '../dtos/token-revoke-input.dto';
import { FilterRefreshTokenDto } from '../dtos/filter-rtoken.dto';
import { Not, Repository } from 'typeorm';
import { TokenRevokeBy } from '../enums/token-revoke-by.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenEntity } from '../entities/token.entity';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(TokenEntity)
    private readonly tokenRepo: Repository<TokenEntity>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  getTokens(
    ctx: RequestContextDto,
    filterTokenDto: FilterRefreshTokenDto,
  ): Promise<TokenEntity[]> {
    const {
      userId,
      replacedById,
      createdByIp,
      revokedByIp,
      expiresAt,
      revokedAt,
    } = filterTokenDto;

    const reqQuery: any = {};

    if (userId) reqQuery.userId = userId;
    if (createdByIp) reqQuery.createdByIp = createdByIp;

    return this.tokenRepo.find({
      // where: reqQuery,
      // relations: ['replacedTokens']
    });
  }

  async getToken(ctx: RequestContextDto, id: string): Promise<TokenEntity> {
    const token = await this.tokenRepo.findOne({ where: { id } });
    if (!token) {
      throw new NotFoundException(`Token of id#${id} not found.`);
    }
    return token;
  }

  findTokenById(ctx: RequestContextDto, id: string): Promise<TokenEntity> {
    return this.tokenRepo.findOne({ where: { id } });
  }

  async createToken(
    ctx: RequestContextDto,
    createTokenDto: CreateRefreshTokenDto,
  ): Promise<TokenEntity> {
    // createRefreshTokenDto.userId = ctx.userId;
    createTokenDto.createdByIp = ctx.ip;

    const rtoken = this.tokenRepo.create(createTokenDto);
    await this.tokenRepo.save(rtoken);

    return rtoken;
  }

  async updateToken(
    ctx: RequestContextDto,
    id: string,
    updateTokenDto: UpdateRefreshTokenDto,
  ): Promise<TokenEntity> {
    const token = await this.getToken(ctx, id);
    Object.assign(token, updateTokenDto);
    return this.tokenRepo.save(token);
  }

  async updateManyToken(
    ctx: RequestContextDto,
    filterTokenDto: FilterRefreshTokenDto,
    updateTokenDto: UpdateRefreshTokenDto,
  ): Promise<any> {
    updateTokenDto.revokedByIp = ctx.ip;
    updateTokenDto.revokedAt = new Date().toISOString();
    // const rtokens = await this.rtokenRepo.createQueryBuilder('user')

    const tokens = await this.tokenRepo
      .createQueryBuilder('user')
      .update()
      .set(updateTokenDto)
      .where(filterTokenDto)
      // .where("id = :id", { id: 1 })
      .returning('id, revoked_at, user_id')
      .execute();

    return tokens;
  }

  // async refreshRefreshToken(id: string, revokeRefreshTokenDto: RefreshRefreshTokenDto)
  // : Promise<RefreshTokenEntity> {
  //   const rtoken = await this.getRefreshTokenById(id);
  //   Object.assign(rtoken, revokeRefreshTokenDto);
  //   return this.rtokenRepo.save(rtoken);
  // }

  // async revokeRefreshToken(id: string, revokeRefreshTokenDto: Partial<RevokeRefreshTokenDto>)
  // : Promise<RefreshTokenEntity> {
  //   const rtoken = await this.getRefreshTokenById(id);
  //   Object.assign(rtoken, revokeRefreshTokenDto);
  //   return this.rtokenRepo.save(rtoken);
  // }

  async deleteToken(ctx: RequestContextDto, id: string): Promise<TokenEntity> {
    const token = await this.getToken(ctx, id);
    return this.tokenRepo.remove(token);
  }

  // ---------------------
  public async getAuthToken(
    ctx: RequestContextDto,
    getAuthTokenInput: GetAuthTokenInput,
  ) {
    const {
      generateBy,
      refreshToken,
      user: inputUser,
      revokeFor,
    } = getAuthTokenInput;
    // generate accessToken and refreshToken by providing refreshToken
    if (generateBy === TokenGenerateBy.RefreshToken) {
      // get user and rtoken by resolving refreshToken
      const { user, rtoken } = await this.resolveRefreshToken(
        ctx,
        refreshToken,
      );
      // revoke refresh token by RevokeGrant rule
      const tokenRevokeInput = {
        revokeBy: TokenRevokeBy.RefreshToken,
        refreshToken,
        revokeFor,
      };
      await this.revokeRefreshToken(ctx, tokenRevokeInput);
      // generate new access tken
      const newAccessToken = await this.generateAccessToken(ctx, user);
      // generate new refresh token if current refresh token is revoked
      let newRefreshToken = refreshToken;
      if (revokeFor === RevokeGrant.One || revokeFor === RevokeGrant.All) {
        newRefreshToken = await this.generateRefreshToken(ctx, user);
      }
      // return accessToken and refreshToken
      return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    }

    // generate accessToken and refreshToken by providing user
    if (generateBy === TokenGenerateBy.UserDto) {
      const accessToken = await this.generateAccessToken(
        ctx,
        getAuthTokenInput.user,
      );
      // revoke all the old refresh token of this user
      const tokenRevokeInput = {
        revokeBy: TokenRevokeBy.UserDto,
        user: inputUser,
        revokeFor,
      };
      await this.revokeRefreshToken(ctx, tokenRevokeInput);
      // generate new access token
      const newAccessToken = await this.generateAccessToken(ctx, inputUser);
      // return accessToken and refreshToken
    }

    return getAuthTokenInput;
  }

  public async generateAccessToken(
    ctx: RequestContextDto,
    user: UserDto,
  ): Promise<string> {
    const expiresIn: number =
      +this.configService.get('JWT_ACCESS_TOKEN_EXPIRES') || 60 * 60 * 5; // ttl in second

    const opts: SignOptions = {
      ...BaseJwtSignOptions,
      // expiresIn, // import er somoy set kora ace
      subject: user.id,
    };

    return this.jwtService.signAsync({}, opts);
  }

  public async generateRefreshToken(
    ctx: RequestContextDto,
    user: UserDto,
  ): Promise<string> {
    const expiresIn: number =
      +this.configService.get('JWT_REFRESH_TOKEN_EXPIRES') || 60 * 60 * 24 * 7; // ttl in second

    const expiresAt = new Date();
    expiresAt.setTime(expiresAt.getTime() + expiresIn * 1000).toString();
    const createRefreshTokenDto = {
      userId: user.id,
      expiresAt: expiresAt.toISOString(),
    } as CreateRefreshTokenDto;

    const rtoken = await this.createToken(ctx, createRefreshTokenDto);

    const opts: SignOptions = {
      ...BaseJwtSignOptions,
      expiresIn,
      subject: user.id,
      jwtid: rtoken.id,
    };

    return this.jwtService.signAsync({}, opts);
  }

  // generate only new accesstoken
  public async createAccessTokenFromRefreshToken(
    ctx: RequestContextDto,
    refreshToken: string,
  ): Promise<string> {
    const { user, rtoken } = await this.resolveRefreshToken(ctx, refreshToken);

    return this.generateAccessToken(ctx, user);
  }

  private async resolveRefreshToken(
    ctx: RequestContextDto,
    refreshToken: string,
  ): Promise<{ user: UserDto; rtoken: RefreshTokenDto }> {
    const payload = await this.decodeRefreshToken(ctx, refreshToken);
    const rtoken = await this.getStoredTokenFromRefreshTokenPayload(
      ctx,
      payload,
    );

    if (!rtoken) {
      throw new UnprocessableEntityException('Refresh token not found');
    }

    // isActive, isExpired
    if (rtoken.revokedAt) {
      throw new UnprocessableEntityException('Refresh token revoked');
    }

    const user = await this.getUserFromRefreshTokenPayload(ctx, payload);

    if (!user) {
      throw new UnprocessableEntityException('Refresh token malformed');
    }

    return { user, rtoken };
  }

  // get user entity from access token
  public async resolveAccessToken(
    ctx: RequestContextDto,
    accessToken: string,
  ): Promise<{ user: UserDto }> {
    const payload: AccessTokenPayload = await this.decodeAccessToken(
      ctx,
      accessToken,
    );
    const user = await this.getUserFromAccessTokenPayload(ctx, payload);
    // accessToken er ttl er vitor kono refresh token live ace kina check korte hobe
    if (!user) {
      throw new UnprocessableEntityException('Access token malformed');
    }
    return { user };
  }

  public async revokeRefreshToken(
    ctx: RequestContextDto,
    tokenRevokeInput: TokenRevokeInput,
  ): Promise<void> {
    const { revokeBy, revokeFor, refreshToken, user } = tokenRevokeInput;

    if (revokeFor === RevokeGrant.None) return;

    let updateQuery = {} as FilterRefreshTokenDto;
    const updateRefreshTokenDto = {} as UpdateRefreshTokenDto;

    if (revokeBy === TokenRevokeBy.RefreshToken) {
      const { jti: rtokenId, sub: userId } = await this.decodeRefreshToken(
        ctx,
        refreshToken,
      );
      updateRefreshTokenDto.replacedById = rtokenId;

      switch (revokeFor) {
        case RevokeGrant.One:
          updateQuery = { id: rtokenId };
          break;
        case RevokeGrant.Others:
          updateQuery = { userId, id: Not(rtokenId) };
          break;
        case RevokeGrant.All:
          updateQuery = { userId };
          break;
      }
    }
    // for userDto, RevokeGrant either none or all
    if (revokeBy === TokenRevokeBy.UserDto) {
      if (revokeFor === RevokeGrant.One || revokeFor === RevokeGrant.All) {
        throw new BadRequestException(`Revoke grant either be for None or All`);
      }
      updateQuery = { userId: user.id }; //  revokeFor===RevokeGrant.All
    }

    await this.updateManyToken(ctx, updateQuery, updateRefreshTokenDto);
  }

  public async decodeAccessToken(
    ctx,
    accessToken: string,
  ): Promise<AccessTokenPayload> {
    try {
      const decoded = await this.jwtService.verifyAsync(accessToken);
      return decoded;
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        throw new UnprocessableEntityException('Access token expired');
      } else {
        throw new UnprocessableEntityException('Access token malformed');
      }
    }
  }

  public async decodeRefreshToken(
    ctx,
    refreshToken: string,
  ): Promise<RefreshTokenPayload> {
    try {
      const decoded = await this.jwtService.verifyAsync(refreshToken);
      return decoded;
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        throw new UnprocessableEntityException('Refresh token expired');
      } else {
        throw new UnprocessableEntityException('Refresh token malformed');
      }
    }
  }

  private async getUserFromAccessTokenPayload(
    ctx: RequestContextDto,
    payload: AccessTokenPayload,
  ): Promise<UserDto> {
    const subjectId = payload.sub;
    if (!subjectId) {
      throw new UnprocessableEntityException('Access token malformed');
    }
    return this.userService.findUserById(subjectId);
  }

  private async getUserFromRefreshTokenPayload(
    ctx: RequestContextDto,
    payload: RefreshTokenPayload,
  ): Promise<UserDto> {
    const subjectId = payload.sub;
    if (!subjectId) {
      throw new UnprocessableEntityException('Refresh token malformed');
    }
    return this.userService.findUserById(subjectId);
  }

  private async getStoredTokenFromRefreshTokenPayload(
    ctx: RequestContextDto,
    payload: RefreshTokenPayload,
  ): Promise<RefreshTokenDto | null> {
    const rtokenId = payload.jti;
    if (!rtokenId) {
      throw new UnprocessableEntityException('Refresh token malformed');
    }
    return this.findTokenById(ctx, rtokenId);
  }

  async setTwoFactorAuthenticationSecret(secret: string, userId: number) {
    // return this.usersRepository.update(userId, {
    //   twoFactorAuthenticationSecret: secret
    // });
  }
}
