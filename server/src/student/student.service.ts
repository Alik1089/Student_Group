import { Student } from './entities/student.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Repository } from 'typeorm';


@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepository:Repository<Student>,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    const { userId,  groupId,  } = createStudentDto;
    return await this.studentRepository.create(createStudentDto)  ;
  }

  async findAll() {
    const students = await this.studentRepository.find({
      relations:{
        user:true,
      }
    })
    return students;
  }

  findOne(id: number) {
    return `This action returns a #${id} student`;
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
