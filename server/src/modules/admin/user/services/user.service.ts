import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UpdatePasswordDto } from '../dtos/update-password.dto';
import { CreateUserDto } from '../dtos/create-user.dto';
import { FilterUserDto } from '../dtos/filter-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserDto } from '../dtos/user.dto';
import { UserEntity } from '../entities/user.entity';
import { Transactional } from 'typeorm-transactional';
import { Repository } from 'typeorm';
import { AuthMailService } from '@modules/mail/services/auth-mail.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    private readonly authMailService: AuthMailService,
  ) {}

  getUsers(filterUserDto: FilterUserDto): Promise<UserEntity[]> {
    const { email } = filterUserDto;

    const reqQuery: any = {};
    if (email) reqQuery.email = email;

    return this.userRepo.find({ where: reqQuery });
  }

  async getUser(id: string): Promise<UserEntity> {
    const user = await this.userRepo
      .createQueryBuilder('user')
      .select(['user', 'tasks'])
      .leftJoin('user.tasks', 'tasks')
      // .leftJoin('user.peoples', 'peoples')
      .where({ id })
      .getOne();

    if (!user) {
      throw new NotFoundException(`User of id #${id} not found.`);
    }

    return user;
  }

  async findUserById(id: string): Promise<UserEntity> {
    return this.userRepo.findOne({ where: { id } });
  }

  findUserByEmail(email: string): Promise<UserEntity> {
    return this.userRepo.findOne({ where: { email } });
  }

  @Transactional()
  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    let userPassword = createUserDto.password;

    const isGenerate = false;
    if (isGenerate) {
      userPassword = Math.random().toString(36).slice(-8);
    }

    const hashedPassword = await bcrypt.hash(userPassword, 10);
    const user = this.userRepo.create({
      ...createUserDto,
      password: hashedPassword,
    });
    await this.userRepo.save(user);
    delete user.password;

    // await this.peopleRepo
    //   .createQueryBuilder('people')
    //   .update()
    //   .set({ userId: user.id })
    //   .where({ email: user.email })
    //   .execute();

    // validate email

    // console.log('send password to email', user.email, newPassword);
    const isSendCredentials = false;
    if (isSendCredentials) {
      const credentialsMailDro = {
        name: user.username,
        email: user.email,
        password: createUserDto.password,
      };
      await this.authMailService.sendCredentialsEmail(credentialsMailDro);
    }

    return user;
  }

  @Transactional()
  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User of id #${id} not found.`);
    }

    // if (updateUserDto.email) {
    //   await this.peopleRepo
    //     .createQueryBuilder('people')
    //     .update()
    //     .set({ email: updateUserDto.email })
    //     .where({ email: user.email })
    //     .execute();
    // }

    this.userRepo.merge(user, updateUserDto);
    return this.userRepo.save(user);
  }

  async updatePassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<UserEntity> {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User of id #${id} not found.`);
    }

    const valid = await this.validateUser(
      user,
      updatePasswordDto.currentPassword,
    );
    if (!valid) {
      throw new UnauthorizedException('Password is not valid');
    }

    user.password = await bcrypt.hash(updatePasswordDto.newPassword, 10);

    return this.userRepo.save(user);
  }

  async resetPassword(id: string, password: string): Promise<UserDto> {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User of id #${id} not found.`);
    }

    user.password = await bcrypt.hash(password, 10);

    return this.userRepo.save(user);
  }

  async deleteUser(id: string): Promise<UserEntity> {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User of id #${id} not found.`);
    }

    return this.userRepo.remove(user);
  }

  async validateUser(user: UserEntity, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.password);
  }
}
