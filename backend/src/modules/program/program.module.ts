import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProgramController } from './controllers/program.controller';
import { ProgramEntity } from './entities/program.entity';
import { ProgramService } from './services/program.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProgramEntity])],
  controllers: [ProgramController],
  providers: [ProgramService],
  exports: [],
})
export class ProgramModule {}
