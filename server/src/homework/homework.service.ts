import { Teacher } from './../teacher/entities/teacher.entity';
import { Group } from './../group/entities/group.entity';
import { Homework } from './entities/homework.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateHomeworkDto } from './dto/create-homework.dto';
import { UpdateHomeworkDto } from './dto/update-homework.dto';
import { Repository } from 'typeorm';

@Injectable()
export class HomeworkService {
  constructor(
    @InjectRepository(Homework)
    private homeworkRepository: Repository<Homework>,
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
  ) {}

  async create(createHomeworkDto: CreateHomeworkDto) {
    const { name, groupId } = createHomeworkDto;
    const group = await this.groupRepository.findOne({
      where: { id: groupId },
    });
    if (group) {
      return await this.homeworkRepository.save(createHomeworkDto);
    } else {
      return 'Group is not defined';
    }
  }

  findAll() {
    return this.homeworkRepository.find();
  }

  async findAllByGroupId(id: number) {
    const group = await this.groupRepository.findOneBy({ id });
    if (group) {
      return await this.homeworkRepository.find({
        where: {
          groupId: id,
        },
      });
    } else {
      return 'Group is not defined';
    }
  }

  async findOne(id: number) {
    const data = await this.homeworkRepository.findOneBy({ id });
    if (data) {
      return await this.homeworkRepository.findOneBy({ id });
    } else {
      return 'Homework is not defined';
    }
  }

  update(id: number, updateHomeworkDto: UpdateHomeworkDto) {
    return `This action updates a #${id} homework`;
  }

  async remove(id: number) {
    const homework = await this.homeworkRepository.findOneBy({id})
    if(homework){
      return await this.homeworkRepository.delete(id)
    }else{
      return "Homework is not defined"
    } 
  }
}
