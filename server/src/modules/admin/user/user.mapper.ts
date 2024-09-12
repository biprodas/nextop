import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { UserResponseDto } from "./dtos/user-response.dto";
import { UserEntity } from "./entities/user.entity";

export class UserMapper {
  public static async toDto(entity: UserEntity): Promise<UserResponseDto> {
    const dto = new UserResponseDto();
    dto.id = entity.id;
    // dto.username = entity.username;
    // dto.status = entity.status;
    // dto.isAdmin = entity.isAdmin;
    return dto;
  }

  public static async toDtoWithRelations(entity: UserEntity): Promise<UserResponseDto> {
    const dto = new UserResponseDto();
    dto.id = entity.id;
    // dto.username = entity.username;
    // dto.roles = await Promise.all((await entity.roles).map(RoleMapper.toDtoWithRelations));
    // dto.isAdmin = entity.isAdmin;
    // dto.status = entity.status;
    return dto;
  }

  public static toCreateEntity(dto: CreateUserDto): UserEntity {
    const entity = new UserEntity();
    // entity.username = dto.username;
    // entity.password = dto.password;
    // entity.roles = Promise.resolve(dto.roles.map(id => new RoleEntity({ id })));
    // entity.status = UserStatus.Active;
    // entity.isAdmin = false;
    return entity;
  }

  public static toUpdateEntity(entity: UserEntity, dto: UpdateUserDto): UserEntity {
    // entity.username = dto.username;
    // entity.roles = Promise.resolve(dto.roles.map(id => new RoleEntity({ id })));
    // entity.status = dto.status;
    return entity;
  }
}
