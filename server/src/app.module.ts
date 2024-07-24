import { Homework } from './homework/entities/homework.entity';
import { Group } from './group/entities/group.entity';
import { Course } from './course/entities/course.entity';
import { Teacher } from './teacher/entities/teacher.entity';
import { Student } from './student/entities/student.entity';
import { Model } from './module/entities/module.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { StudentModule } from './student/student.module';
import { TeacherModule } from './teacher/teacher.module';
import { User } from './users/entities/user.entity';
import { CourseModule } from './course/course.module';
import { ModuleModule } from './module/module.module';
import { GroupModule } from './group/group.module';
import { HomeworkModule } from './homework/homework.module';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { RateModule } from './rate/rate.module';
import { Rate } from './rate/entities/rate.entity';
import { ModuleGroupModule } from './module-group/module-group.module';
import { ModuleGroup } from './module-group/entities/module-group.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'testu',
      entities: [
        User,
        Student,
        Teacher,
        Course,
        Model,
        Group,
        Homework,
        Rate,
        ModuleGroup,
      ],
      synchronize: true,
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_USER, // generated ethereal user
          pass: process.env.EMAIL_PASS, // generated ethereal password
        },
      },
    }),

    AuthModule,
    UsersModule,
    TeacherModule,
    StudentModule,
    CourseModule,
    ModuleModule,
    GroupModule,
    RateModule,
    HomeworkModule,
    ModuleGroupModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
