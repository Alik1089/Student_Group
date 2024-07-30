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
    if (course) {
      await this.moduleRepository.save({name, course});
      return this.findAll()
    }else{
      return 'Does not have that course';
    }
  }

  async findAll() {
    return  await this.moduleRepository.find({
      relations:{
        course:true
      }
    });
  }

  async findOne(id: number) {
    const module = await this.moduleRepository.findOneBy({id})
    if(module){
      return module
    }else{return "Module id is wrong"}
  }

  async findAllByCourseId(id:number){
    const course = await this.courseRepository.findOneBy({id})
    if(course){
      return this.moduleRepository.find({
        where:{
          courseId:id
        }
      })
    }else{return "Course id is wrong"}
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
      await this.moduleRepository.delete(id)
      return this.findAll()
    }
    return `That id was wrong`;
  }
}
