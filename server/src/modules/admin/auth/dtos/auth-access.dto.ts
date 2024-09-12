// if role/permission is not dynamic
export class AuthAccessDto {
  additionalPermissions: string[];
  roles: {
    name: string;
    permissions: string[];
  }[];
}
