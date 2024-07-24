import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {ApiProperty} from "@nestjs/swagger"
import { JoiSchema } from 'nestjs-joi';
import * as Joi from 'joi';


export class UpdateUserDto extends PartialType(CreateUserDto) {

}

export class Login{
    @ApiProperty()
    username:string
    @ApiProperty()
    password:string
}

export class ForgetPasswordDto {
    @ApiProperty()
    @JoiSchema(Joi.string().pattern(/^\d+$/).length(5).required())
    code:string
    @ApiProperty()
    @JoiSchema(Joi.string().min(5).max(16).required())
    password:string
    @ApiProperty()
    @JoiSchema(Joi.string().min(5).max(16).valid(Joi.ref("password")).required())
    confirmPassword:string
}

export class ChangePasswordDto{
    @ApiProperty()
    @JoiSchema(Joi.string().min(5).max(16).required())
    oldPassword:string

    @ApiProperty()
    @JoiSchema(Joi.string().min(5).max(16).required())
    newPassword:string

    @ApiProperty()
    @JoiSchema(Joi.string().min(5).max(16).valid(Joi.ref("newPassword")).required())
    confirmPassword:string
}

export class ChangeNameSurnameDto{
    @ApiProperty()
    @JoiSchema(Joi.string().required())
    name:string

    @ApiProperty()
    @JoiSchema(Joi.string().required())
    surname:string

}

export class EmailDto {
    @ApiProperty()
    email:string
}