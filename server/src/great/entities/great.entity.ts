import { Student } from './../../student/entities/student.entity';
import { Homework } from './../../homework/entities/homework.entity';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Greate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sum: number;

  @ManyToOne((type) => Homework, (homework) => homework.greate)
  homework: Homework;

  @ManyToOne((type) => Student, (student) => student.rate)
  student: Student;
}
