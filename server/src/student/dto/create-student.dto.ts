import { ApiProperty } from "@nestjs/swagger"
import * as Joi from "joi"
import { JoiSchema } from "nestjs-joi"

export class CreateStudentDto {
    @ApiProperty()
    @JoiSchema(Joi.number().required())
    userId:number
  
    @ApiProperty()
    @JoiSchema(Joi.number().required())
    groupId:number
}
