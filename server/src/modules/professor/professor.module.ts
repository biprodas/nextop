import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProfessorController } from './controllers/professor.controller';
import { ProfessorEntity } from './entities/professor.entity';
import { ProfessorService } from './services/professor.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProfessorEntity])],
  controllers: [ProfessorController],
  providers: [ProfessorService],
  exports: [],
})
export class ProfessorModule {}
