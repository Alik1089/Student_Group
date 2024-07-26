import { Rate } from './../../rate/entities/rate.entity';
import { Teacher } from './../../teacher/entities/teacher.entity';
import { Group } from './../../group/entities/group.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Model } from 'src/module/entities/module.entity';
import * as Joi from "joi"
import { JoiSchema } from "nestjs-joi"

@Entity()
export class Homework {
  @PrimaryGeneratedColumn()
  @JoiSchema(Joi.number().required())
  id: number;

  @Column()
  @JoiSchema(Joi.string().required())
  name: string;

  @Column()
  @JoiSchema(Joi.number().required())
  groupId: number;

  @Column()
  @JoiSchema(Joi.number().required())
  modelId:number


  @ManyToOne((type) => Group, (group) => group.homework)
  @JoinColumn({name:"groupId"})
  group: Group;

  @ManyToOne((type) => Model, (module) => module.homework)
  @JoinColumn({name:"modelId"})
  model: Model;

  @OneToMany((type) => Rate, (rate) => rate.homework)
  rate:Rate

}
