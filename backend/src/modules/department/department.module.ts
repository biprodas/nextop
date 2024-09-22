import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DepartmentController } from './controllers/department.controller';
import { DepartmentEntity } from './entities/department.entity';
import { DepartmentService } from './services/department.service';

@Module({
  imports: [TypeOrmModule.forFeature([DepartmentEntity])],
  controllers: [DepartmentController],
  providers: [DepartmentService],
  exports: [],
})
export class DepartmentModule {}
