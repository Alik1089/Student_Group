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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath: `.env`,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'university',
      entities: [User, Student, Teacher, Course, Model, Group, Homework,Rate],
      synchronize: true
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
