import { Teacher } from './entities/teacher.entity';
import { UsersService } from 'src/users/users.service';
import { Injectable } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher) private teacherRepository:Repository<Teacher>,
  ) {}

  async create(createTeacherDto: CreateTeacherDto) {
    const { userId,  salary,  } = createTeacherDto;
    return await this.teacherRepository.create(createTeacherDto)  ;
  }

  
  async findAll() {
    const teachers = await this.teacherRepository.find({
      relations:{
        user:true,
        // group:{
        //   student:{
        //     user:true
        //   }
        // }
      }
    })
    return teachers;
  }

  findOne(id: number) {
    return `This action returns a #${id} teacher`;
  }

  update(id: number, updateTeacherDto: UpdateTeacherDto) {
    return `This action updates a #${id} teacher`;
  }

  remove(id: number) {
    return `This action removes a #${id} teacher`;
  }
}
