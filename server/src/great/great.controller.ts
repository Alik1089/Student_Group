import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GreatService } from './great.service';
import { CreateGreatDto } from './dto/create-great.dto';
import { UpdateGreatDto } from './dto/update-great.dto';
import {ApiTags} from "@nestjs/swagger"
@ApiTags('great')
@Controller('great')
export class GreatController {
  constructor(private readonly greatService: GreatService) {}

  @Post()
  create(@Body() createGreatDto: CreateGreatDto) {
    return this.greatService.create(createGreatDto);
  }

  @Get()
  findAll() {
    return this.greatService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.greatService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGreatDto: UpdateGreatDto) {
    return this.greatService.update(+id, updateGreatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.greatService.remove(+id);
  }
}
