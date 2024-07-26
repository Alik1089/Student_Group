import { ApiProperty } from '@nestjs/swagger';
import * as Joi from "joi"
import { JoiSchema } from "nestjs-joi"

export class SearchHomeworktDto {
    @ApiProperty()
    @JoiSchema(Joi.string().required())
    moduleName:string
}
