import { ApiProperty } from '@nestjs/swagger';
import * as Joi from "joi"
import { JoiSchema } from "nestjs-joi"

export class CreateModuleDto {
  @ApiProperty()
  @JoiSchema(Joi.string().required())
  name: string;

  @ApiProperty()
  @JoiSchema(Joi.number().required())
  courseId: number;
}
