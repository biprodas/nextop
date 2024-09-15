import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StateController } from './controllers/state.controller';
import { StateEntity } from './entities/state.entity';
import { StateService } from './services/state.service';

@Module({
  imports: [TypeOrmModule.forFeature([StateEntity])],
  controllers: [StateController],
  providers: [StateService],
  exports: [],
})
export class StateModule {}
