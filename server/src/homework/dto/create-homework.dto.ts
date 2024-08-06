import { ApiProperty } from "@nestjs/swagger"
import * as Joi from "joi"
import { JoiSchema } from "nestjs-joi"

export class CreateHomeworkDto {
    @ApiProperty()
    @JoiSchema(Joi.string().required())
    name: string;

    @ApiProperty()
    @JoiSchema(Joi.string().required())
    description: string;
  
    @ApiProperty()
    @JoiSchema(Joi.number().required())
    groupId: number;

    @ApiProperty()
    @JoiSchema(Joi.number().required())
    moduleId: number;
}
