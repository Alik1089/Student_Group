import { multerOptions } from '../configs/uploadConfig';
import { FileInterceptor } from '@nestjs/platform-express';
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
  Request,
  UseInterceptors,
  UploadedFile,
  Res,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto, ForgetPasswordDto, ChangePasswordDto, ChangeNameSurnameDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { HasRoles } from 'src/auth/has-roles.decorator';
import { Response } from 'express';
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HasRoles(Role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiResponse({description:"user create admin"})
  @ApiBearerAuth('JWT-auth')
  @Post()
  create(@Request() req, @Body() createUserDto: CreateUserDto) {
    return this.usersService.create(req, createUserDto);
  }

  // @HasRoles(Role.ADMIN)
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // @ApiResponse({description:"user show admin"})
  // @ApiBearerAuth('JWT-auth')
  @Get()
  findAll(@Query("role") role:number) {
    return this.usersService.findAll(role);
  }

  @HasRoles(Role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiResponse({description:"user show admin"})
  @ApiBearerAuth('JWT-auth')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Get(':email')
  findOneEmail(@Param('email') email: string) {
    return this.usersService.findOneEmail({email:email});
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file', multerOptions))
  @Patch('/pictureupdate/:id')
  async updatepicture(
    @Param('id') id: string,
    @UploadedFile() file,
    @Res() res: Response,
  ) {
    try {
      const data = await this.usersService.updatepicture(+id, file);
      return res.status(HttpStatus.CREATED).json(data);
    } catch (e) {
      return res
        .status(HttpStatus.OK)
        .json({ message: e.message, error: true });
    }
  }

  @Patch('/forgetPassword/:email')
  async forgetPassword(
    @Res() res: Response,
    @Param("email") email:string
  ) {
    try {
      const data = await this.usersService.forgetPassword(email);
      return res.status(HttpStatus.CREATED).json(data);
    } catch (e) {
      return res
        .status(HttpStatus.OK)
        .json({ message: e.message, error: true });
    }
  }

  @Patch('/resetPassword/:email')
  async resetPassword(
    @Res() res: Response,
    @Param("email") email:string,
    @Body() forgetPassword:ForgetPasswordDto
  ) {
    try {
      const data = await this.usersService.resetPassword(email, forgetPassword);
      return res.status(HttpStatus.CREATED).json(data);
    } catch (e) {
      return res
        .status(HttpStatus.OK)
        .json({ message: e.message, error: true });
    }
  }

  @Patch("/changePassword/:id")
  async changePassword(
    @Res() res: Response,
    @Param("id") id:string,
    @Body() changePasswordDto:ChangePasswordDto
  ){
    try {
      const data = await this.usersService.changePassword(+id, changePasswordDto);
      return res.status(HttpStatus.CREATED).json(data);
    } catch (e) {
      return res
        .status(HttpStatus.OK)
        .json({ message: e.message, error: true });
    }
  }

  @Patch("/changeNameSurname/:id")
  async changeNameSurname(
    @Res() res: Response,
    @Param("id") id:string,
    @Body() changeNameSurnameDto:ChangeNameSurnameDto
  ){
    try {
      const data = await this.usersService.changeNameSurname(+id, changeNameSurnameDto);
      return res.status(HttpStatus.CREATED).json(data);
    } catch (e) {
      return res
        .status(HttpStatus.OK)
        .json({ message: e.message, error: true });
    }
  }

  @HasRoles(Role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiResponse({ description: 'user deleted admin' })
  @ApiBearerAuth('JWT-auth')
  @Delete(':id')
  remove(@Param('id') id: string, @Query("role") role:number) {
    return this.usersService.remove11(+id, role);
  }

  
}
