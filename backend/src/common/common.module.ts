import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseOptionsService } from 'src/common/database/services/database.options.service';
import { DatabaseOptionsModule } from 'src/common/database/database.options.module';
import { DATABASE_CONNECTION_NAME } from 'src/common/database/constants/database.constant';

@Module({
  controllers: [],
  providers: [],
  imports: [
    MongooseModule.forRootAsync({
      connectionName: DATABASE_CONNECTION_NAME,
      imports: [DatabaseOptionsModule],
      inject: [DatabaseOptionsService],
      useFactory: (databaseOptionsService: DatabaseOptionsService) =>
        databaseOptionsService.createOptions(),
    }),
  ],
})
export class CommonModule {}
