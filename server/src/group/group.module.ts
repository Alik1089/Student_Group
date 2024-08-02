import { Model } from './../module/entities/module.entity';
import { Teacher } from './../teacher/entities/teacher.entity';
import { Group } from 'src/group/entities/group.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { ModuleGroup } from 'src/module-group/entities/module-group.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Group, Teacher, Model, ModuleGroup])],
  controllers: [GroupController],
  providers: [GroupService],
  exports: [GroupService],
})
export class GroupModule {}
