import { Model } from './../module/entities/module.entity';
import { Rate } from './../rate/entities/rate.entity';
import { Group } from 'src/group/entities/group.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { Student } from './entities/student.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Student, Group, Rate, Model])],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
