import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateGroupDto } from './create-group.dto';
import * as Joi from "joi"
import { JoiSchema } from "nestjs-joi"

export class UpdateGroupDto extends PartialType(CreateGroupDto) {
    @ApiProperty()
    @JoiSchema(Joi.string().required())
    name:string
  
    @ApiProperty()
    @JoiSchema(Joi.number().required())
    count:number

    @ApiProperty()
    @JoiSchema(Joi.number().required())
    moduleId:number

    @ApiProperty()
    @JoiSchema(Joi.number().required())
    teacherId:number
}
