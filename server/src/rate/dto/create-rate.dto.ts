import { ApiProperty } from '@nestjs/swagger';
import * as Joi from "joi"
import { JoiSchema } from "nestjs-joi"

export class CreateRateDto {
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
