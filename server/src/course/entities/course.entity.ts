import { Model } from './../../module/entities/module.entity';
import { Column, Entity,  OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import * as Joi from "joi"
import { JoiSchema } from "nestjs-joi"

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  @JoiSchema(Joi.number().required())
  id: number;

  @Column()
  @JoiSchema(Joi.string().required())
  name: string;

  @Column()
  @JoiSchema(Joi.string().required())
  duration: string;

  @OneToMany((type) => Model, (module) => module.course)
  module: Model[];
}
