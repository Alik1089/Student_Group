import { Student } from './../../student/entities/student.entity';
import { Homework } from './../../homework/entities/homework.entity';
import { Teacher } from './../../teacher/entities/teacher.entity';
import { Model } from './../../module/entities/module.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ModuleGroup } from 'src/module-group/entities/module-group.entity';

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  teacherId: number;

  @Column()
  count: number;

  @ManyToOne((type) => Model, (module) => module.group, {
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
  })
  module: Model;

  @OneToMany((type) => ModuleGroup, (module) => module.group, {
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
  })
  modulegroup: ModuleGroup[];

  @ManyToOne((type) => Teacher, (teacher) => teacher.group, {
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
  })
  @JoinColumn({name:"teacherId"})
  teacher: Teacher;

  @OneToMany((type) => Homework, (homework) => homework.group,  {
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
  })
  homework: Homework[];

  @OneToMany((type) => Student, (student) => student.group,  {
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
  })
  student: Student[];
}
