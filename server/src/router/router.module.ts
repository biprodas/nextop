import { DynamicModule, ForwardReference, Module, Type } from '@nestjs/common';
import { RouterModule as NestJsRouterModule } from '@nestjs/core';
import { RoutesPublicModule } from './routes/routes.public.module';
import { RoutesUserModule } from './routes/routes.user.module';
import { RoutesAuthModule } from './routes/routes.auth.module';
import { RoutesAdminModule } from './routes/routes.admin.module';
import { AppController } from 'src/app/controllers/app.controller';

@Module({})
export class RouterModule {
  static forRoot(): DynamicModule {
    const imports: (DynamicModule | Type<any> | Promise<DynamicModule> | ForwardReference<any>)[] =
      [];

    if (process.env.HTTP_ENABLE === 'true') {
      imports.push(
        RoutesPublicModule,
        RoutesUserModule,
        RoutesAdminModule,
        RoutesAuthModule,
        NestJsRouterModule.register([
          {
            path: '/public',
            module: RoutesPublicModule,
          },
          {
            path: '/admin',
            module: RoutesAdminModule,
          },
          {
            path: '/user',
            module: RoutesUserModule,
          },
          {
            path: '/auth',
            module: RoutesAuthModule,
          },
        ]),
      );
    }

    return {
      module: RouterModule,
      providers: [],
      exports: [],
      controllers: [AppController],
      imports,
    };
  }
}
