import { EmailModule } from './../email/email.module';
import { Student } from './../student/entities/student.entity';
import { Teacher } from './../teacher/entities/teacher.entity';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Group } from 'src/group/entities/group.entity';
import { JoiPipeModule } from 'nestjs-joi';

@Module({
  imports:[TypeOrmModule.forFeature([User, Teacher, Student, Group]), EmailModule, JoiPipeModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
