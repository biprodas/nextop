import { Reflector } from '@nestjs/core';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UserEntity } from '@admin/user/entities/user.entity';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const permissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );
    if (!permissions?.length) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    return this.matchPermissions(permissions, user);
  }

  async matchPermissions(
    permissions: string[],
    user: UserEntity,
  ): Promise<boolean> {
    //TODO: ctx a module nam pathate hobe, thene user, role, permissions etc theke validate korte hobe
    // const { permissions: permissionDto, roles } = await UserMapper.toDtoWithRelations(user);

    // let allPermissions: string[] = permissionDto.map(({ slug }) => slug);
    // roles.forEach(({ permissions }) => {
    // 		const rolePermissions = permissions.map(({ slug }) => slug);
    // 		allPermissions = allPermissions.concat(rolePermissions);
    // });

    // return permissions.some(permission => allPermissions?.includes(permission));
    return false;
  }
}
