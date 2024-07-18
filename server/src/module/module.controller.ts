import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { ModuleService } from './module.service';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('module')
@Controller('module')
export class ModuleController {
  constructor(private readonly moduleService: ModuleService) {}

  // @HasRoles(Role.ADMIN)
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // @ApiResponse({description:"user deleted admin"})
  // @ApiBearerAuth('JWT-auth')
  @Post()
  async create(@Body() createModuleDto: CreateModuleDto, @Res() res: Response) {
    try {
      const data = await this.moduleService.create(createModuleDto);
      return res.status(HttpStatus.CREATED).json(data);
    } catch (e) {
      return res
        .status(HttpStatus.OK)
        .json({ message: e.message, error: true });
    }
  }

  @Get()
  findAll() {
    return this.moduleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moduleService.findOne(+id);
  }

  // @HasRoles(Role.ADMIN)
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // @ApiResponse({description:"user deleted admin"})
  // @ApiBearerAuth('JWT-auth')
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateModuleDto: UpdateModuleDto, @Res() res: Response) {
    try {
      const data = await this.moduleService.update(+id, updateModuleDto);
      return res.status(HttpStatus.CREATED).json(data);
    } catch (e) {
      return res
        .status(HttpStatus.OK)
        .json({ message: e.message, error: true });
    }
  }

  // @HasRoles(Role.ADMIN)
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // @ApiResponse({description:"user deleted admin"})
  // @ApiBearerAuth('JWT-auth')
  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      const data = await this.moduleService.remove(+id);
      return res.status(HttpStatus.CREATED).json(data);
    } catch (e) {
      return res
        .status(HttpStatus.OK)
        .json({ message: e.message, error: true });
    }
  }
}
