import { IRateRemove } from './../types/index';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { RateService } from './rate.service';
import { CreateRateDto } from './dto/create-rate.dto';
import { UpdateRateDto } from './dto/update-rate.dto';
import { Response } from 'express';

@Controller('rate')
export class RateController {
  constructor(private readonly rateService: RateService) {}

  @Post()
  async create(@Body() createRateDto: CreateRateDto, @Res() res: Response) {
    try {
      const data = await this.rateService.create(createRateDto);
      return res.status(HttpStatus.CREATED).json(data);
    } catch (e) {
      return res
        .status(HttpStatus.OK)
        .json({ message: e.message, error: true });
    }
  }

  @Get()
  findAll() {
    return this.rateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rateService.findOne(+id);
  }

  @Patch('update')
  async update(
    @Body() updateRateDto: UpdateRateDto,
    @Res() res: Response,
  ) {
    try {
      const data = await this.rateService.update(updateRateDto);
      return res.status(HttpStatus.CREATED).json(data);
    } catch (e) {
      return res
        .status(HttpStatus.OK)
        .json({ message: e.message, error: true });
    }
  }

  @Delete(':studentId/:homeworkId')
  async remove(
    @Param('studentId') studentId: number,
    @Param('homeworkId') homeworkId: number,
    @Res() res: Response,
  ) {
    try {
      const data = await this.rateService.remove({ homeworkId, studentId });
      return res.status(HttpStatus.CREATED).json(data);
    } catch (e) {
      return res
        .status(HttpStatus.OK)
        .json({ message: e.message, error: true });
    }
  }
}
