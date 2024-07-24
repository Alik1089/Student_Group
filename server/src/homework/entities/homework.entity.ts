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

@Entity()
export class Homework {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  groupId: number;

  @Column()
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
