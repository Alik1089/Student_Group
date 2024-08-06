import { Model } from 'src/module/entities/module.entity';
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
    @InjectRepository(Model)
    private modelRepository: Repository<Model>,
  ) {}

  async create(createHomeworkDto: CreateHomeworkDto) {
    const { groupId, moduleId, name, description } = createHomeworkDto;
    const homeworks = await this.homeworkRepository.find({
      where: {
        groupId: groupId,
        modelId: moduleId,
      },
    });
    if (homeworks.length == 12) {
      return 'Count of homework completed';
    } else {
      const group = await this.groupRepository.findOne({
        where: { id: groupId },
      });
      if (group) {
        const module = await this.modelRepository.findOne({
          where: { id: moduleId },
        });
        if (module) {
          await this.homeworkRepository.save({
            group, modelId:moduleId,name, description 
          });
          return true;
        } else {
          return 'Module is not found';
        }
      } else {
        return 'Group is not defined';
      }
    }
  }

  findAll() {
    return this.homeworkRepository.find({
      relations: {
        group: true,
        model: true,
      },
    });
  }

  async findAllByGroupId(groupId: number, moduleId: number) {
    const group = await this.groupRepository.findOneBy({ id: groupId });
    const model = await this.modelRepository.findOneBy({ id: moduleId });
    if (group) {
      if (model) {
        return await this.homeworkRepository.find({
          where: {
            groupId: groupId,
            modelId: moduleId,
          },
          relations: {
            model: true,
          },
        });
      } else {
        return 'Module is not defined';
      }
    } else {
      return 'Group is not defined';
    }
  }

  async findAllByModelId(id: number) {
    const homework = await this.homeworkRepository.find({
      where: { modelId: id },
    });
    if (homework) {
      return homework;
    } else {
      return 'homework is not found';
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
    const homework = await this.homeworkRepository.findOneBy({ id });
    if (homework) {
      return await this.homeworkRepository.delete(id);
    } else {
      return 'Homework is not defined';
    }
  }
}
