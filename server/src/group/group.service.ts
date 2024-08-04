import { Teacher } from './../teacher/entities/teacher.entity';
import { Model } from './../module/entities/module.entity';
import { Group } from './entities/group.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Repository } from 'typeorm';
import { ModuleGroup } from 'src/module-group/entities/module-group.entity';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group) private groupRepository: Repository<Group>,
    @InjectRepository(Model) private moduleRepository: Repository<Model>,
    @InjectRepository(Teacher) private teacherRepository: Repository<Teacher>,
    @InjectRepository(ModuleGroup)
    private moduleGroupRepository: Repository<ModuleGroup>,
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
        const group = await this.groupRepository.save({
          name,
          count,
          module,
          teacher,
        });
        await this.moduleGroupRepository.save({ group, module });
        return group;
      } else {
        return 'Teacher not found';
      }
    } else {
      return 'Module not found';
    }
  }

  findAll() {
    return this.groupRepository.find({
      relations: {
        teacher: {
          user: true,
        },
        module: {
          course: true,
        },
      },
      select: {
        teacher: {
          userId: true,
          user: {
            name: true,
            surname: true,
          },
        },
      },
    });
  }

  async findAllByTeacherId(teacherId){
    const teacher = await this.teacherRepository.findOne({where:{userId:teacherId}})
    if(teacher){
      return this.groupRepository.find({where:{
        teacherId
      },
      relations:{
        student:{
          user:true
        }
      },
      select:{
        student:{
          userId:true,
          user: {
            name: true,
            surname: true,
            age:true
          },
        }
      }
    })
    }else{return "Teacher is not defined"}
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
          student: {
            user: true,
          },
        },
        select: {
          module: {
            name: true,
          },
          student: {
            userId: true,
            user: {
              name: true,
              surname: true,
            },
          },
          teacher: {
            userId: true,
            user: {
              name: true,
              surname: true,
            },
          },
        },
      });
      return group;
    } else {
      return 'Group is not found';
    }
  }

  async update(id: number, updateGroupDto: UpdateGroupDto) {
    const { teacherId, moduleId, ...data } = updateGroupDto;
    console.log(updateGroupDto);

    const group = await this.groupRepository.findOne({
      where: { id },
      relations: { teacher: true, module: true },
    });
    if (group) {
      let teacher;
      if (teacherId) {
        teacher = await this.teacherRepository.findOne({
          where: { userId: teacherId },
        });
        if (!teacher) return { message: 'Teacher is not found' };
      }
      let module;
      if (moduleId) {
        module = await this.moduleRepository.findOne({
          where: { id: moduleId },
        });
        if (!module) return { message: 'module is not found' };
      }
      await this.groupRepository.update(+id, {
        ...data,
        teacher: teacher ? teacher : group.teacher,
        module: module ? module : group.module,
      });
      if (module) {
        await this.moduleGroupRepository.save({ group, model: module });
      }
      return { groups: await this.findAll(), group: await this.findOne(id) };
    } else {
      return 'Group is not found';
    }
  }

  async remove(id: number) {
    const group = this.groupRepository.findOneBy({ id });
    if (group) {
      await this.groupRepository.delete(id);
      return this.findAll();
    } else {
      return 'Group is not found';
    }
  }
}
