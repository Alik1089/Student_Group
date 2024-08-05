import { Rate } from '././entities/rate.entity';
import { Student } from './../student/entities/student.entity';
import { Homework } from './../homework/entities/homework.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRateDto } from './dto/create-rate.dto';
import { UpdateRateDto } from './dto/update-rate.dto';
import { Repository } from 'typeorm';

@Injectable()
export class RateService {
  constructor(
    @InjectRepository(Rate) private rateRepository: Repository<Rate>,
    @InjectRepository(Homework)
    private homeworkRepository: Repository<Homework>,
    @InjectRepository(Student) private studentRepository: Repository<Student>,
  ) {}

  async create(createRateDto: CreateRateDto) {
    const { homeworkId, studentId } = createRateDto;
    const homework = await this.homeworkRepository.findOneBy({
      id: homeworkId,
    });
    if (homework) {
      const student = await this.studentRepository.findOneBy({
        userId: studentId,
      });
      if (student) {
        return await this.rateRepository.save(createRateDto);
      } else {
        return 'Student is not defined';
      }
    } else {
      return 'Homework is not defined';
    }
  }

  findAll() {
    const rates = this.rateRepository.find()
    return rates;
  }

  findOne(id: number) {
    return `This action returns a #${id} rate`;
  }

  async update(updateRateDto: UpdateRateDto) {
    const { homeworkId, studentId } = updateRateDto;
    const rate = await this.rateRepository.findOne({
      where: { homeworkId, studentId },
    });
    if (rate) {
      return await this.rateRepository.update(
        { homeworkId, studentId },
        updateRateDto,
      );
    } else {
      return 'Doesnt have that combination';
    }
  }

  async remove({ homeworkId, studentId }) {
    const rate = await this.rateRepository.findOne({
      where: { homeworkId, studentId },
    });
    if (rate) {
      return await this.rateRepository.delete({ homeworkId, studentId });
    } else {
      return 'Doesnt have that combination';
    }
  }
}
