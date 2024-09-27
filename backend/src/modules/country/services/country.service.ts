import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RequestContextDto } from '@common/dtos/request-context.dto';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateCountryDto, FilterCountryDto, UpdateCountryDto } from '../dtos';
import { CountryEntity } from '../entities/country.entity';

@Injectable()
export class CountryService {
  private logger = new Logger(CountryService.name);

  constructor(
    @InjectRepository(CountryEntity)
    private readonly countryRepo: Repository<CountryEntity>,
  ) {}

  getCountries(
    _ctx: RequestContextDto,
    dto: FilterCountryDto,
  ): Promise<CountryEntity[]> {
    this.logger.log(`${this.getCountries.name} Service Called`);

    const { name } = dto;

    const reqQuery: any = {};
    if (name) reqQuery.name = name;

    return this.countryRepo.find({ where: reqQuery });
  }

  async getCountry(
    _ctx: RequestContextDto,
    id: string,
  ): Promise<CountryEntity> {
    this.logger.log(`${this.getCountry.name} Service Called`);

    const country = await this.countryRepo.findOne({ where: { id } });
    if (!country) {
      throw new NotFoundException(`Country of id ${id} not found.`);
    }

    return country;
  }

  async createCountry(
    _ctx: RequestContextDto,
    dto: CreateCountryDto,
  ): Promise<CountryEntity> {
    this.logger.log(`${this.createCountry.name} Service Called`);

    const country = this.countryRepo.create(dto);

    return this.countryRepo.save(country);
  }

  async updateCountry(
    ctx: RequestContextDto,
    id: string,
    dto: UpdateCountryDto,
  ): Promise<CountryEntity> {
    this.logger.log(`${this.updateCountry.name} Service Called`);

    const country = await this.getCountry(ctx, id);
    this.countryRepo.merge(country, dto);

    return this.countryRepo.save(country);
  }

  async deleteCountry(
    ctx: RequestContextDto,
    id: string,
  ): Promise<CountryEntity> {
    this.logger.log(`${this.deleteCountry.name} Service Called`);

    const country = await this.getCountry(ctx, id);

    return this.countryRepo.remove(country);
  }
}
