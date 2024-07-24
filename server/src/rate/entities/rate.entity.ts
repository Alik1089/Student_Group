import { Student } from './../../student/entities/student.entity';
import { Homework } from './../../homework/entities/homework.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Rate {
  @PrimaryColumn()
  homeworkId: number;

  @PrimaryColumn()
  studentId: number;

  @Column()
  rate:number

  @ManyToOne((type) => Homework, (homework) => homework.rate)
  homework: Homework;


  @ManyToOne((type) => Student, (student) => student.rate, {
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
  })
  @JoinColumn({name:"studentId"})
  student: Student;
}
