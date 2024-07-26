import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateModuleDto } from './create-module.dto';
import * as Joi from "joi"
import { JoiSchema } from "nestjs-joi"

export class UpdateModuleDto extends PartialType(CreateModuleDto) {
    @ApiProperty()
    @JoiSchema(Joi.string().required())
    name:string
  
    @ApiProperty()
    @JoiSchema(Joi.number().required())
    courseId:number
}
