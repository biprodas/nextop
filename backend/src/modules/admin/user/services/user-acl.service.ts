// import { Injectable } from '@nestjs/common';
// import { UserRole } from '../enums/user-role.enum';
// import { UserEntity } from '../entities/user.entity';
// import { BaseAclService } from '@shared/acl/acl.service';
// import { Action } from '@shared/acl/action.constant';
// import { Actor } from '@shared/acl/actor.constant';

// @Injectable()
// export class UserAclService extends BaseAclService {
//   constructor() {
//     super();
//     // Admin can do all action
//     this.canDo(UserRole.Admin, [Action.Manage]);
//     //user can read himself or any other user
//     this.canDo(UserRole.User, [Action.Read]);
//     // user can only update himself
//     this.canDo(UserRole.User, [Action.Update], this.isUserItself);
//   }

//   isUserItself(resource: UserEntity, actor: Actor): boolean {
//     return resource.id === actor.id;
//   }
// }
