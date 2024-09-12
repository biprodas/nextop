import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RequestContext } from '@common/decorators/request-context.decorator';
import { BaseApiSuccessResponse } from '@common/dtos/base-api-response.dto';
import { Serialize } from '@common/interceptors/serialize.interceptor';
import { RequestContextDto } from '@common/dtos/request-context.dto';
import { UpdatePasswordDto } from '../dtos/update-password.dto';
import { UUIDParam } from '@common/decorators/http.decorator';
import { UserResponseDto } from '../dtos/user-response.dto';
import { CreateUserDto } from '../dtos/create-user.dto';
import { FilterUserDto } from '../dtos/filter-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserService } from '../services/user.service';
import { JwtAuthGuard } from '@admin/auth/guards';
import { UserDto } from '../dtos/user.dto';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Serialize(UserResponseDto)
  @Get('/')
  async getUsers(
    @RequestContext() ctx: RequestContextDto,
    @Query() filterUserDto: FilterUserDto,
  ): Promise<BaseApiSuccessResponse<UserResponseDto[]>> {
    const users = await this.userService.getUsers(filterUserDto);

    return {
      success: true,
      statusCode: 200,
      message: `List of system users`,
      data: users,
    };
  }

  @Get('/:id')
  async getUser(
    @RequestContext() ctx: RequestContextDto,
    @UUIDParam('id') userId: string,
  ): Promise<BaseApiSuccessResponse<UserResponseDto>> {
    const user = await this.userService.getUser(userId);

    return {
      success: true,
      statusCode: 200,
      message: `Details of user of id ${user.id}`,
      data: user,
    };
  }

  @Serialize(UserResponseDto)
  @Post('/')
  async createUser(
    @RequestContext() ctx: RequestContextDto,
    @Body() createUserDto: CreateUserDto,
  ): Promise<BaseApiSuccessResponse<UserResponseDto>> {
    const user = await this.userService.createUser(createUserDto);

    return {
      success: true,
      statusCode: 201,
      message: `New user of id: ${user.id} created`,
      data: user,
    };
  }

  @Serialize(UserResponseDto)
  @Put('/:id')
  async updateUser(
    @RequestContext() ctx: RequestContextDto,
    @UUIDParam('id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<BaseApiSuccessResponse<UserResponseDto>> {
    const user = await this.userService.updateUser(userId, updateUserDto);

    return {
      success: true,
      statusCode: 200,
      message: `User of id ${user.id} updated`,
      data: user,
    };
  }

  @Serialize(UserResponseDto)
  // even super-admin should not change the password
  @Patch('/update-password/:id')
  async updatePassword(
    @RequestContext() ctx: RequestContextDto,
    @UUIDParam('id') userId: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<BaseApiSuccessResponse<UserDto>> {
    const user = await this.userService.updatePassword(
      userId,
      updatePasswordDto,
    );

    return {
      success: true,
      statusCode: 200,
      message: `User password of id ${user.id} updated`,
      data: user,
    };
  }

  // even super-admin should not change the password
  // @Patch('/update-roles/:id')
  // async updateRoles(
  //   @RequestContext() ctx: RequestContextDto,
  //   @UUIDParam('id') userId: string,
  //   @Body(new ParseArrayPipe({items: UpdateUserRolesDto})) updateRolesDto: UpdateUserRolesDto[]
  // ): Promise<BaseApiSuccessResponse<UserDto>> {
  //   this.logger.verbose(`User "Unknown" updating roles of user of id #${userId}. Data: ${JSON.stringify(updateRolesDto)}`);

  //   const user = await this.userService.updateRoles(userId, updateRolesDto);

  //   return {
  //     success: true,
  //     statusCode: 200,
  //     message: `Roles of user id ${user.id} updated`,
  //     data: user
  //   }
  // }
  @Serialize(UserResponseDto)
  @Delete('/:id')
  async deleteUser(
    @RequestContext() ctx: RequestContextDto,
    @UUIDParam('id') userId: string,
  ): Promise<BaseApiSuccessResponse<UserResponseDto>> {
    const user = await this.userService.deleteUser(userId);

    return {
      success: true,
      statusCode: '',
      message: `User of id ${user.id} deleted`,
      data: user,
    };
  }
}
