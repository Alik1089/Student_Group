import { Model } from 'src/module/entities/module.entity';
import { Group } from './../group/entities/group.entity';
import { Homework } from './entities/homework.entity';
import { Teacher } from './../teacher/entities/teacher.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { HomeworkService } from './homework.service';
import { HomeworkController } from './homework.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Model } from 'src/module/entities/module.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Homework,Group, Teacher, Model])],
  controllers: [HomeworkController],
  providers: [HomeworkService],
  exports:[HomeworkService]
})
export class HomeworkModule {}
