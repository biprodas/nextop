import { Controller, Get, Version } from '@nestjs/common';
import { AppService } from '../services/app.service';

@Controller({ version: '1' })
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getHello(): string {
    console.log('Get Hello Version 1');
    return this.appService.getHello();
  }

  @Version('2')
  @Get('/')
  getHelloV2(): string {
    console.log('Get Hello Version 2');
    return this.appService.getHello();
  }
}
