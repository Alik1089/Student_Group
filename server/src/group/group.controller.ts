import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import {ApiTags} from "@nestjs/swagger"
import { Response } from 'express';
@ApiTags('group')

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  // @HasRoles(Role.ADMIN)
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // @ApiResponse({description:"user deleted admin"})
  // @ApiBearerAuth('JWT-auth')
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

  // @HasRoles(Role.ADMIN)
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // @ApiResponse({description:"user deleted admin"})
  // @ApiBearerAuth('JWT-auth')
  @Get()
  findAll() {
    return this.groupService.findAll();
  }

  // @HasRoles(Role.ADMIN)
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // @ApiResponse({description:"user deleted admin"})
  // @ApiBearerAuth('JWT-auth')
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

  // @HasRoles(Role.ADMIN)
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // @ApiResponse({description:"user deleted admin"})
  // @ApiBearerAuth('JWT-auth')
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

  // @HasRoles(Role.ADMIN)
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // @ApiResponse({description:"user deleted admin"})
  // @ApiBearerAuth('JWT-auth')
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
