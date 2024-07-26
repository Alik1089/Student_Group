import { Rate } from './../../rate/entities/rate.entity';
import { Group } from './../../group/entities/group.entity';
import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Model } from 'src/module/entities/module.entity';
import * as Joi from "joi"
import { JoiSchema } from "nestjs-joi"

@Entity()
export class ModuleGroup {
  @PrimaryColumn()
  @JoiSchema(Joi.number().required())
  groupId: number;

  @PrimaryColumn()
  @JoiSchema(Joi.number().required())
  modelId: number;

  @ManyToOne((type) => Group, (group) => group.modulegroup, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'groupId' })
  group: Group;

  @ManyToOne((type) => Model, (group) => group.modulegroup, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'modelId' })
  model: Model;
}
