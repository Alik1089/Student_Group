import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course) private courseRepository:Repository<Course>,
  ) {}

  async create(createCourseDto: CreateCourseDto) {
    const {name} = createCourseDto;
    const corect = await this.courseRepository.findOneBy({name});
    
    if(corect) return {message: name+" has already"}
    return await this.courseRepository.save(createCourseDto);
  }

  async findAll() {
    return await this.courseRepository.find();
  }

  async CourseModules(id: number) {
    const coursesData =  await this.courseRepository.find({
      where:{
        id
      },
      relations:{
        module:true,
      }
    })
    return coursesData ? coursesData : {message:"course not found"}
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    return await this.courseRepository.update(id,updateCourseDto)
  }

  async remove(id: number) {
    return await this.courseRepository.delete(id);
  }
}
