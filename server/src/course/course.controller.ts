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
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('course')
@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  // @HasRoles(Role.ADMIN)
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // @ApiResponse({description:"user deleted admin"})
  // @ApiBearerAuth('JWT-auth')
  @Post()
  async create(@Body() createCourseDto: CreateCourseDto, @Res() res: Response) {
    try {
      const data = await this.courseService.create(createCourseDto);
      return res.status(HttpStatus.CREATED).json(data);
    } catch (e) {
      return res
        .status(HttpStatus.OK)
        .json({ message: e.message, error: true });
    }
  }

  @Get()
  findAll() {
    return this.courseService.findAll();
  }

  // @HasRoles(Role.ADMIN)
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // @ApiResponse({description:"user deleted admin"})
  // @ApiBearerAuth('JWT-auth')
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const data = await this.courseService.CourseModules(+id);
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
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(+id, updateCourseDto);
  }

  // @HasRoles(Role.ADMIN)
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // @ApiResponse({description:"user deleted admin"})
  // @ApiBearerAuth('JWT-auth')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(+id);
  }
}
