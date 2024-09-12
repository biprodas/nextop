import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from '@admin/user/entities/user.entity';

export const CurrentUser = createParamDecorator<UserEntity>(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
