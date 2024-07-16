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

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  studentId: number;
  @Column()
  teacherId: number;

  @Column()
  count: string;

  @ManyToOne((type) => Model, (module) => module.group)
  module: Model;

  @ManyToOne((type) => Teacher, (teacher) => teacher.group)
  @JoinColumn({name:"teacherId"})
  teacher: Teacher;

  @OneToMany((type) => Homework, (homework) => homework.group)
  homework: Homework[];

  @OneToMany((type) => Student, (student) => student.group)
  @JoinColumn({name:"studentId"})
  student: Student[];
}
