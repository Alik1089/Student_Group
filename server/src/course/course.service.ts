import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course) private courseRepository: Repository<Course>,
  ) {}

  async create(createCourseDto: CreateCourseDto) {
    const { name } = createCourseDto;
    const corect = await this.courseRepository.findOneBy({ name });

    if (corect) return { message: name + ' has already' };
    return await this.courseRepository.save(createCourseDto);
  }

  async findAll() {
    return await this.courseRepository.find();
  }

  async CourseModules(id: number) {
    const coursesData = await this.courseRepository.findOne({
      where: {
        id,
      },
      relations: {
        module: true,
      },
    });
    return coursesData ? coursesData : { message: 'course not found' };
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    const coursesData = await this.courseRepository.find({
      where: {
        id,
      },
    });
    if (coursesData) {
      await this.courseRepository.update(id, updateCourseDto);
      return await this.courseRepository.find();
    } else {
      return { message: 'course not found' };
    }
  }

  async remove(id: number) {
    await this.courseRepository.delete(id);
    return await this.findAll();
  }
}
