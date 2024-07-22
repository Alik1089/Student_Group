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
import { HomeworkService } from './homework.service';
import { CreateHomeworkDto } from './dto/create-homework.dto';
import { UpdateHomeworkDto } from './dto/update-homework.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('homework')
@Controller('homework')
export class HomeworkController {
  constructor(private readonly homeworkService: HomeworkService) {}

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

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateHomeworkDto: UpdateHomeworkDto,
  ) {
    return this.homeworkService.update(+id, updateHomeworkDto);
  }

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
