import { Rate } from './../../rate/entities/rate.entity'
import { Group } from './../../group/entities/group.entity';
import { User } from './../../users/entities/user.entity';
import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Student {
  @PrimaryColumn()
  userId: number;

  @OneToOne((type) => User, (user) => user.student,{
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
  })
  @JoinColumn({name:"userId"})
  user: User;

  @ManyToOne((type) => Group, (group) => group.student, {
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
  })
  group: Group;

  @OneToMany((type) => Rate, (rate) => rate.student, {})
  rate:Rate
}
