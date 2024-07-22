import { Group } from './../group/entities/group.entity';
import { Homework } from './entities/homework.entity';
import { Teacher } from './../teacher/entities/teacher.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { HomeworkService } from './homework.service';
import { HomeworkController } from './homework.controller';

@Module({
  imports:[TypeOrmModule.forFeature([Homework,Group, Teacher])],
  controllers: [HomeworkController],
  providers: [HomeworkService],
  exports:[HomeworkService]
})
export class HomeworkModule {}
