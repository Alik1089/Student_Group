import { Greate } from './../../great/entities/great.entity';
import { Teacher } from './../../teacher/entities/teacher.entity';
import { Group } from './../../group/entities/group.entity';
import {
  Column,
  Entity,
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
  count: string;

  @ManyToOne((type) => Group, (group) => group.homework)
  group: Group;

  @ManyToOne((type) => Teacher, (teacher) => teacher.homework)
  teacher: Teacher;

  @OneToMany((type) => Greate, (greate) => greate.homework)
  greate: Greate[];
}
