import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateStudentDto } from './create-student.dto';
import * as Joi from "joi"
import { JoiSchema } from "nestjs-joi"

export class UpdateStudentDto extends PartialType(CreateStudentDto) {
    @ApiProperty()
    @JoiSchema(Joi.number().required())
    groupId:number
}
