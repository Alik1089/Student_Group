import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateRateDto } from './create-rate.dto';
import * as Joi from "joi"
import { JoiSchema } from "nestjs-joi"

export class UpdateRateDto extends PartialType(CreateRateDto) {
    @ApiProperty()
    @JoiSchema(Joi.number().required())
    rate: number;

    @ApiProperty()
    @JoiSchema(Joi.number().required())
    homeworkId: number;
  
    @ApiProperty()
    @JoiSchema(Joi.number().required())
    studentId: number;
}
