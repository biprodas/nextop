import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UniversityController } from './controllers/university.controller';
import { UniversityService } from './services/university.service';
import { UniversityEntity } from './entities/university.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UniversityEntity])],
  controllers: [UniversityController],
  providers: [UniversityService],
  exports: [],
})
export class UniversityModule {}
