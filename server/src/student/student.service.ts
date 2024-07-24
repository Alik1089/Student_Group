import { Model } from './../module/entities/module.entity';
import { Group } from 'src/group/entities/group.entity';
import { Student } from './entities/student.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Repository } from 'typeorm';
import { Rate } from 'src/rate/entities/rate.entity';
import { timingSafeEqual } from 'crypto';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
    @InjectRepository(Group) private groupRepository: Repository<Group>,
    @InjectRepository(Rate) private rateRepository: Repository<Rate>,
    @InjectRepository(Model) private modelRepository: Repository<Model>,
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

  async findAllHomeworks(id: number) {
    const student = await this.studentRepository.find({
      where: { userId: id },
    });
    if (student.length) {
      return await this.rateRepository.find({
        where: {
          studentId: id,
        },
        relations: {
          homework: true,
        },
      });
    } else {
      return 'Student id is wrong';
    }
  }

  async findAllRates(id: number) {
    const student = await this.studentRepository.find({
      where: { userId: id },
    });
    if (student.length) {
      return await this.rateRepository.find({
        where: {
          studentId: id,
        },
      });
    } else {
      return 'Student id is wrong';
    }
  }

  async findAllGroupRates(id: number) {
    const student = await this.studentRepository.findOne({
      where: { userId: id },
      relations: { group: true },
    });
    if (student) {
      console.log(student);
      const friends = await this.studentRepository.find({
        where: { group: student.group },
        relations: {
          user: true,
          group:true,
          rate:{
            homework:true
          }
        },
        select: {
          user: {
            id:true,
            name:true,
            surname:true,
            email:true,
          },
          group:{
            id:true
          },
          rate:{
            rate:true,
            homework:{
              id:true,
              name:true
            }
          }
        },
      });
      return friends;
    } else {
      return 'Student id is wrong';
    }
  }

  async findOne(id: number) {
    const data = await this.studentRepository
      .createQueryBuilder('student')
      .where('student.userId=:id', { id })
      .innerJoinAndSelect('student.rate', 'rate')
      .select('AVG(rate.rate)', 'avg')
      .getRawOne();
    console.log(data);

    return data;
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
