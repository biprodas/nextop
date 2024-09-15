import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CountryController } from './controllers/country.controller';
import { CountryEntity } from './entities/country.entity';
import { CountryService } from './services/country.service';

@Module({
  imports: [TypeOrmModule.forFeature([CountryEntity])],
  controllers: [CountryController],
  providers: [CountryService],
  exports: [],
})
export class CountryModule {}
