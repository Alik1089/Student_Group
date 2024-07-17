import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  Delete
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Login } from 'src/users/dto/update-user.dto';
import { HasRoles } from './has-roles.decorator';
import { Role } from 'src/users/entities/role.enum';
import { RolesGuard } from './roles.guard';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    private readonly usersService: UsersService) {}

  // @HasRoles(Role.ADMIN)
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // @ApiBearerAuth('JWT-auth')
  // @Post('register')
  // register(@Request() req) {
  //   return req.user;
  // }
  
  @HasRoles(Role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiResponse({description:"user added admin"})
  @ApiBearerAuth('JWT-auth')
  @Post("add_user")
  async register(@Body() user:CreateUserDto){
    return this.usersService.create(user)
  }

  // @HasRoles(Role.ADMIN)
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // @ApiResponse({description:"user deleted admin"})
  // @ApiBearerAuth('JWT-auth')
  // @Delete("delete")
  // async delete(@Body() id:number){
  //   return this.usersService.remove11(id)
  // }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req, @Body() login: Login) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @HasRoles(Role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiBearerAuth('JWT-auth')
  @Get('admin')
  getAdmin(@Request() req) {
    return req.user;
  }


}