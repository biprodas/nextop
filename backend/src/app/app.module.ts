import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JobsModule } from '../job/jobs.module';
import { AppService } from './services/app.service';
import { AppController } from './controllers/app.controller';
import { TodoModule } from '@modules/todo/todo.module';
import { DatabaseModule } from 'src/database/database.module';
import { DictionaryModule } from '@modules/dictionary/dictionary.module';
import { WordModule } from '@modules/word/word.module';
import { ScheduleModule } from '@nestjs/schedule';
import { FileModule } from '@modules/file/file.module';
import { configValidationSchema } from 'src/config/config.schema';
import configs from '../config';
import { TaskModule } from '@modules/task/task.module';
import { LogModule } from '@modules/log/log.module';
import { AdminModule } from '@admin/admin.module';
import { MailModule } from '@modules/mail/mail.module';
import { CountryModule } from '@modules/country/country.module';
import { StateModule } from '@modules/state/state.module';
import { UniversityModule } from '@modules/university/university.module';
import { DepartmentModule } from '@modules/department/department.module';
import { ProfessorModule } from '@modules/professor/professor.module';
import { ProgramModule } from '@modules/program/program.module';
import { CategoryModule } from '@modules/category/department.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: configs,
      isGlobal: true,
      cache: true,
      envFilePath: ['.env'],
      // envFilePath: `.env.${process.env.NODE_ENV}`,
      validationSchema: configValidationSchema,
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
    ScheduleModule.forRoot(),
    DatabaseModule,
    AdminModule,
    FileModule,
    // CommonModule,
    // DictionaryModule,
    // WordModule,
    TaskModule,
    LogModule,
    MailModule,
    JobsModule.forRoot(),
    // new modules
    CategoryModule,
    CountryModule,
    StateModule,
    UniversityModule,
    DepartmentModule,
    ProfessorModule,
    ProgramModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
