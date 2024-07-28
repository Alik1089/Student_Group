import { Role } from './../entities/role.enum';
import { ApiProperty } from '@nestjs/swagger';
import * as Joi from "joi"
import { JoiSchema } from "nestjs-joi"

export class CreateUserDto {
  @ApiProperty()
  @JoiSchema(Joi.string().required())
  name: string;

  @ApiProperty()
  @JoiSchema(Joi.string().required())
  surname: string;

  @ApiProperty()
  @JoiSchema(Joi.number().required())
  age: number;

  @ApiProperty()
  @JoiSchema(Joi.string().required())
  email: string;

  @ApiProperty()
  @JoiSchema(Joi.string().min(5).max(16).required())
  password: string;

  @ApiProperty()
  @JoiSchema(Joi.number().required())
  role: Role;

  @ApiProperty()
  @JoiSchema(Joi.string().required())
  phoneNumber: string;

  @ApiProperty()
  @JoiSchema(Joi.number())
  salary:number
  
  @ApiProperty()
  @JoiSchema(Joi.number())
  groupId:number
}
