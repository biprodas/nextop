import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DegreeController } from './controllers/degree.controller';
import { DegreeEntity } from './entities/degree.entity';
import { DegreeService } from './services/degree.service';

@Module({
  imports: [TypeOrmModule.forFeature([DegreeEntity])],
  controllers: [DegreeController],
  providers: [DegreeService],
  exports: [],
})
export class DegreeModule {}
