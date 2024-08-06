import { RolesGuard } from './../auth/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/users/entities/role.enum';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Res,
  HttpStatus,
  Request,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HasRoles } from 'src/auth/has-roles.decorator';
import { Response } from 'express';
import { SearchHomeworktDto } from './dto/search-homework.dto';

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
  @ApiResponse({ description: 'student show admin' })
  @ApiBearerAuth('JWT-auth')
  @Get()
  findAll() {
    return this.studentService.findAll();
  }

  @HasRoles(Role.STUDENT)
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ description: 'Student show student' })
  @ApiBearerAuth('JWT-auth')
  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    if(id){
      return this.studentService.findOne(+id);
    }else{
      return this.studentService.findOne(req.user.id);
    }
  }

  @HasRoles(Role.STUDENT)
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ description: 'Student homework show student' })
  @ApiBearerAuth('JWT-auth')
  @Get('/homeworks/:id')
  async findAllHomeworks(
    @Request() req,
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    try {
      const data = await this.studentService.findAllHomeworks(+id);
      return res.status(HttpStatus.CREATED).json(data);
    } catch (e) {
      return res
        .status(HttpStatus.OK)
        .json({ message: e.message, error: true });
    }
  }

  @HasRoles(Role.STUDENT)
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ description: 'Student rates show student' })
  @ApiBearerAuth('JWT-auth')
  @Get('/rates/:id')
  async findAllRates(
    @Request() req,
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    try {
      const data = await this.studentService.findAllRates(+id);
      return res.status(HttpStatus.CREATED).json(data);
    } catch (e) {
      return res
        .status(HttpStatus.OK)
        .json({ message: e.message, error: true });
    }
  }

  @Get('/group-rates/:id')
  async findAllGroupRates(
    @Request() req,
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    try {
      const data = await this.studentService.findAllGroupRates(+id);
      return res.status(HttpStatus.CREATED).json(data);
    } catch (e) {
      return res
        .status(HttpStatus.OK)
        .json({ message: e.message, error: true });
    }
  }

  @Get('/group/:id')
  async findAllGroupStudents(
    @Request() req,
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    try {
      const data = await this.studentService.findAllGroupSudentsEx(+id);
      return res.status(HttpStatus.CREATED).json(data);
    } catch (e) {
      return res
        .status(HttpStatus.OK)
        .json({ message: e.message, error: true });
    }
  }

  @HasRoles(Role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiResponse({description:"Student group changed admin"})
  @ApiBearerAuth('JWT-auth')
  @Get()
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
    @Res() res: Response,
  ) {
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

  @Delete('/group/:id')
  removeGroup(@Param('id') id: string) {
    return this.studentService.removeGroup(+id);
  }
}
