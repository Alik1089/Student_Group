import { UsersService } from './../users/users.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneEmail({email:username});
    if (user && bcrypt.compareSync(pass, user.password)) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = {
      name: user.name,
      surname: user.surname,
      id: user.id,
      role: user.role,
      email: user.email,
      image:user.image
    };
    return {
      access_token: this.jwtService.sign(payload),
      role:user.role
    };
  }

}
