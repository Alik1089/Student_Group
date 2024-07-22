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

@Entity()
export class Homework {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  groupId: number;


  @ManyToOne((type) => Group, (group) => group.homework, {
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
  })
  @JoinColumn({name:"groupId"})
  group: Group;

  @OneToMany((type) => Rate, (rate) => rate.homework, {
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
  })
  rate:Rate

}
