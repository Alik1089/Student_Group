import { Course } from './../course/entities/course.entity';
import { Model } from './entities/module.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ModuleService } from './module.service';
import { ModuleController } from './module.controller';

@Module({
  imports:[TypeOrmModule.forFeature([Model, Course])],
  controllers: [ModuleController],
  providers: [ModuleService],
  exports: [ModuleService],
})
export class ModuleModule {}
