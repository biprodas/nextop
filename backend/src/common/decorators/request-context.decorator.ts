import { RequestContextDto } from '@common/dtos/request-context.dto';
import { createRequestContext } from '@common/utils/request-context';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const RequestContext = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): RequestContextDto => {
    const request = ctx.switchToHttp().getRequest();

    return createRequestContext(request);
  },
);
