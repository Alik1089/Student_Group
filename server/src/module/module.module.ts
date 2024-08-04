import { Course } from './../course/entities/course.entity';
import { Model } from './entities/module.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ModuleService } from './module.service';
import { ModuleController } from './module.controller';
import { Group } from 'src/group/entities/group.entity';
import { ModuleGroup } from 'src/module-group/entities/module-group.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Model, Course, Group, ModuleGroup])],
  controllers: [ModuleController],
  providers: [ModuleService],
  exports: [ModuleService],
})
export class ModuleModule {}
