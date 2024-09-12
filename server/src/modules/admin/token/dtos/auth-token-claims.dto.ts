import { Expose } from 'class-transformer';

// no need

export class UserAccessTokenClaims {
  @Expose()
  id: string;

  @Expose()
  username: string;

  @Expose()
  isAdmin: string;

  // static hole thakbe
  // @Expose()
  // roles: RoleType[];
}

export class UserRefreshTokenClaims {
  id: string;
}
