import { Course } from './../course/entities/course.entity';
import { Model } from './entities/module.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ModuleService {
  constructor(
    @InjectRepository(Model) private moduleRepository: Repository<Model>,
    @InjectRepository(Course) private courseRepository: Repository<Course>,
  ) {}

  async create(createModuleDto: CreateModuleDto) {
    const { courseId, name } = createModuleDto;
    const course = await this.courseRepository.findOne({
      where: { id: courseId },
    });

    if (course) return this.moduleRepository.save({name, course});
    return 'Does not have that course';
  }

  findAll() {
    return `This action returns all module`;
  }

  findOne(id: number) {
    return `This action returns a #${id} module`;
  }

  async update(id: number, updateModuleDto: UpdateModuleDto) {
    const { courseId, name } = updateModuleDto;
    const module = await this.moduleRepository.findOneBy({id});

    if(module){
      const course = await this.courseRepository.findOne({
        where: { id: courseId },
      });
      if(course)return await this.moduleRepository.update(+id, {name, course})
      return "That course was undefined"
    }
    return `That id was wrong`;
  }

  async remove(id: number) {
    const module = await this.moduleRepository.findOneBy({id});
    if(module){
      return await this.moduleRepository.delete(id)
    }
    return `That id was wrong`;
  }
}
