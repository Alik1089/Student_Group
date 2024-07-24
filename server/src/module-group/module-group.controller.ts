import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ModuleGroupService } from './module-group.service';
import { CreateModuleGroupDto } from './dto/create-module-group.dto';
import { UpdateModuleGroupDto } from './dto/update-module-group.dto';

@Controller('module-group')
export class ModuleGroupController {
  constructor(private readonly moduleGroupService: ModuleGroupService) {}

  @Post()
  create(@Body() createModuleGroupDto: CreateModuleGroupDto) {
    return this.moduleGroupService.create(createModuleGroupDto);
  }

  @Get()
  findAll() {
    return this.moduleGroupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moduleGroupService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateModuleGroupDto: UpdateModuleGroupDto) {
    return this.moduleGroupService.update(+id, updateModuleGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moduleGroupService.remove(+id);
  }
}
