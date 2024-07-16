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

@Entity()
export class Teacher {
  @PrimaryColumn()
  userId: number;

  @Column()
  salary: number;

  @OneToOne((type) => User, (user) => user.teacher)
  @JoinColumn({name:"userId"})
  user: User;

  @OneToMany((type) => Group, (group) => group.teacher)
  group: Group[];

  @OneToMany((type) => Homework, (homework) => homework.teacher)
  homework: Homework[];
}
