import { RolesGuard } from './../auth/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { Role } from './../users/entities/role.enum';
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
  UseGuards,
} from '@nestjs/common';
import { HomeworkService } from './homework.service';
import { CreateHomeworkDto } from './dto/create-homework.dto';
import { UpdateHomeworkDto } from './dto/update-homework.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { HasRoles } from 'src/auth/has-roles.decorator';

@ApiTags('homework')
@Controller('homework')
export class HomeworkController {
  constructor(private readonly homeworkService: HomeworkService) { }

  @HasRoles(Role.TEACHER)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiResponse({description:"Homework add teacher"})
  @ApiBearerAuth('JWT-auth')
  @Post()
  async create(@Body() createHomeworkDto: CreateHomeworkDto, @Res() res: Response) {
    try {
      const data = await this.homeworkService.create(createHomeworkDto);
      return res.status(HttpStatus.CREATED).json(data);
    } catch (e) {
      return res
        .status(HttpStatus.OK)
        .json({ message: e.message, error: true });
    }
  }

  @Get()
  findAll() {
    return this.homeworkService.findAll();
  }


  @HasRoles(Role.ADMIN,Role.TEACHER)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiResponse({description:"Homework show  by id admin"})
  @ApiBearerAuth('JWT-auth')
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const data = await this.homeworkService.findOne(+id);
      return res.status(HttpStatus.CREATED).json(data);
    } catch (e) {
      return res
        .status(HttpStatus.OK)
        .json({ message: e.message, error: true });
    }
  }

  @HasRoles(Role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiResponse({description:"Homework show  by group admin"})
  @ApiBearerAuth('JWT-auth')
  @Get("group/:groupId")
  async findAllByGroupId(@Param('groupId') groupId: number, @Res() res: Response) {
    try {
      const data = await this.homeworkService.findAllByGroupId(groupId);
      return res.status(HttpStatus.CREATED).json(data);
    } catch (e) {
      return res
        .status(HttpStatus.OK)
        .json({ message: e.message, error: true });
    }
  }

  @HasRoles(Role.TEACHER, Role.STUDENT)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiResponse({description:"Homework show  by group teacher"})
  @ApiBearerAuth('JWT-auth')
  @Get("homework/:moduleId")
  async findAllByModelId(@Param('modelId') modelId: number, @Res() res: Response){
    try {
      const data = await this.homeworkService.findAllByModelId(modelId);
      return res.status(HttpStatus.CREATED).json(data);
    } catch (e) {
      return res
        .status(HttpStatus.OK)
        .json({ message: e.message, error: true });
    }
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateHomeworkDto: UpdateHomeworkDto,
  ) {
    return this.homeworkService.update(+id, updateHomeworkDto);
  }

  @HasRoles(Role.TEACHER)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiResponse({description:"Homework delete by teacher"})
  @ApiBearerAuth('JWT-auth')
  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      const data = await this.homeworkService.remove(+id);
      return res.status(HttpStatus.CREATED).json(data);
    } catch (e) {
      return res
        .status(HttpStatus.OK)
        .json({ message: e.message, error: true });
    }
  }
}
