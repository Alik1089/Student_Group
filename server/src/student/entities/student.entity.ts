import { Group } from './../../group/entities/group.entity';
import { Greate } from './../../great/entities/great.entity';
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

  @OneToOne((type) => User, (user) => user.student)
  @JoinColumn({name:"userId"})
  user: User;

  @OneToMany((type) => Greate, (greate) => greate.student)
  rate: Greate[];

  @ManyToOne((type) => Group, (group) => group.student)
  group: Group;
}
