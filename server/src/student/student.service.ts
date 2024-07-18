import { Group } from 'src/group/entities/group.entity';
import { Student } from './entities/student.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Repository } from 'typeorm';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
    @InjectRepository(Group) private groupRepository: Repository<Group>,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    const { userId, groupId } = createStudentDto;
    return await this.studentRepository.create(createStudentDto);
  }

  async findAll() {
    const students = await this.studentRepository.find({
      relations: {
        user: true,
      },
    });
    return students;
  }

  findOne(id: number) {
    return `This action returns a #${id} student`;
  }

  
  async update(id: number, updateStudentDto: UpdateStudentDto) {
    const { groupId } = updateStudentDto;
    const student = await this.studentRepository.findOne({
      where: { userId: id },
    });
    if (student) {
      const group = await this.groupRepository.findOne({
        where: { id: groupId },
      });
      if (group) {
        await this.studentRepository.update(+id, { group });
        return this.studentRepository.findOne({
          where: { userId: id },
        });
      } else {
        return 'Group is not found';
      }
    } else {
      return 'Student is not found';
    }
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
