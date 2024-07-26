import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateCourseDto } from './create-course.dto';
import * as Joi from "joi"
import { JoiSchema } from "nestjs-joi"

export class UpdateCourseDto extends PartialType(CreateCourseDto) {
    @ApiProperty()
    @JoiSchema(Joi.string().required())
    name:string
  
    @ApiProperty()
    @JoiSchema(Joi.string().required())
    duration:string
}
