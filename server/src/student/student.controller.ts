import { RolesGuard } from './../auth/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/users/entities/role.enum';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res, HttpStatus } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import {ApiBearerAuth, ApiResponse, ApiTags} from "@nestjs/swagger"
import { HasRoles } from 'src/auth/has-roles.decorator';
import { Response } from 'express';

@ApiTags('student')
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @HasRoles(Role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiResponse({description:"user deleted admin"})
  @ApiBearerAuth('JWT-auth')
  @Get()
  findAll() {
    return this.studentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(+id);
  }

  // @HasRoles(Role.ADMIN)
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // @ApiResponse({description:"user deleted admin"})
  // @ApiBearerAuth('JWT-auth')
  // @Get()
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto, @Res() res:Response) {
    try {
      const data = await this.studentService.update(+id, updateStudentDto);
      return res.status(HttpStatus.CREATED).json(data);
    } catch (e) {
      return res
        .status(HttpStatus.OK)
        .json({ message: e.message, error: true });
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(+id);
  }
}
