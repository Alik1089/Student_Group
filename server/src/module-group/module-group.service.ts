import { Injectable } from '@nestjs/common';
import { CreateModuleGroupDto } from './dto/create-module-group.dto';
import { UpdateModuleGroupDto } from './dto/update-module-group.dto';

@Injectable()
export class ModuleGroupService {
  create(createModuleGroupDto: CreateModuleGroupDto) {
    return 'This action adds a new moduleGroup';
  }

  findAll() {
    return `This action returns all moduleGroup`;
  }

  findOne(id: number) {
    return `This action returns a #${id} moduleGroup`;
  }

  update(id: number, updateModuleGroupDto: UpdateModuleGroupDto) {
    return `This action updates a #${id} moduleGroup`;
  }

  remove(id: number) {
    return `This action removes a #${id} moduleGroup`;
  }
}
