import { Teacher } from './../teacher/entities/teacher.entity';
import { Model } from './../module/entities/module.entity';
import { Group } from './entities/group.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Repository } from 'typeorm';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group) private groupRepository: Repository<Group>,
    @InjectRepository(Model) private moduleRepository: Repository<Model>,
    @InjectRepository(Teacher) private teacherRepository: Repository<Teacher>,
  ) {}

  async create(createGroupDto: CreateGroupDto) {
    const { name, count, moduleId, teacherId } = createGroupDto;
    const module = await this.moduleRepository.findOne({
      where: { id: moduleId },
    });
    if (module) {
      const teacher = await this.teacherRepository.findOne({
        where: { userId: teacherId },
      });
      if (teacher) {
        return await this.groupRepository.save({
          name,
          count,
          module,
          teacher,
        });
      } else {
        return 'Teacher not found';
      }
    } else {
      return 'Module not found';
    }
  }

  findAll() {
    return this.groupRepository.find();
  }

  async findOne(id: number) {
    const group = await this.groupRepository.findOneBy({ id });
    if (group) {
      const group = await this.groupRepository.findOne({
        where: {
          id,
        },
        relations: {
          module: {
            course: true,
          },
          teacher: {
            user: true,
          },
          student:{
            user:true
          }
        },
      });
      return group;
    } else {
      return 'Group is not found';
    }
  }

  async update(id: number, updateGroupDto: UpdateGroupDto) {
    const { name, count, teacherId, moduleId } = updateGroupDto;
    const group = await this.groupRepository.findOneBy({ id });
    if (group) {
      const teacher = await this.teacherRepository.findOne({
        where: { userId: teacherId },
      });
      if (teacher) {
        const module = await this.moduleRepository.findOne({
          where: { id: moduleId },
        });
        if (module) {
          return await this.groupRepository.update(+id, {
            name,
            count,
            teacher,
            module,
          });
        } else {
          return 'Module is not found';
        }
      } else {
        return 'Teacher is not found';
      }
    } else {
      return 'Group is not found';
    }
  }

  remove(id: number) {
    const group = this.groupRepository.findOneBy({ id });
    if (group) {
      return this.groupRepository.delete(id);
    } else {
      return 'Group is not found';
    }
  }
}
