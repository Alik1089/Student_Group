import { Homework } from './../../homework/entities/homework.entity';
import { Group } from './../../group/entities/group.entity';
import { User } from './../../users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import * as Joi from "joi"
import { JoiSchema } from "nestjs-joi"

@Entity()
export class Teacher {
  @PrimaryColumn()
  @JoiSchema(Joi.number().required())
  userId: number;

  @Column()
  @JoiSchema(Joi.number().required())
  salary: number;

  @OneToOne((type) => User, (user) => user.teacher, {
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
  })
  @JoinColumn({name:"userId"})
  user: User;

  @OneToMany((type) => Group, (group) => group.teacher)
  group: Group[];

}
