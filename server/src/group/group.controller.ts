import { RolesGuard } from './../auth/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { Role } from './../users/entities/role.enum';
import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import {ApiBearerAuth, ApiResponse, ApiTags} from "@nestjs/swagger"
import { Response } from 'express';
import { HasRoles } from 'src/auth/has-roles.decorator';
@ApiTags('group')

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @HasRoles(Role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiResponse({description:"Group create admin"})
  @ApiBearerAuth('JWT-auth')
  @Post()
  async create(@Body() createGroupDto: CreateGroupDto, @Res() res:Response) {
    try {
      const data = await this.groupService.create(createGroupDto);
      return res.status(HttpStatus.CREATED).json(data);
    } catch (e) {
      return res
        .status(HttpStatus.OK)
        .json({ message: e.message, error: true });
    }
  }

  @HasRoles(Role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiResponse({description:"Groups show admin"})
  @ApiBearerAuth('JWT-auth')
  @Get()
  findAll() {
    return this.groupService.findAll();
  }

  @HasRoles(Role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiResponse({description:"Group show  admin"})
  @ApiBearerAuth('JWT-auth')
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res:Response) {
    try {
      const data = await this.groupService.findOne(+id);
      return res.status(HttpStatus.CREATED).json(data);
    } catch (e) {
      return res
        .status(HttpStatus.OK)
        .json({ message: e.message, error: true });
    }
  }

  @HasRoles(Role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiResponse({description:"Group update admin"})
  @ApiBearerAuth('JWT-auth')
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto, @Res() res:Response) {
    try {
      const data = await this.groupService.update(+id, updateGroupDto);
      return res.status(HttpStatus.CREATED).json(data);
    } catch (e) {
      return res
        .status(HttpStatus.OK)
        .json({ message: e.message, error: true });
    }
  }

  @HasRoles(Role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiResponse({description:"Group deleted admin"})
  @ApiBearerAuth('JWT-auth')
  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res:Response) {
    try {
      const data = await this.groupService.remove(+id);
      return res.status(HttpStatus.CREATED).json(data);
    } catch (e) {
      return res
        .status(HttpStatus.OK)
        .json({ message: e.message, error: true });
    }
  }
}
