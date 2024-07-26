import { Student } from './../../student/entities/student.entity';
import { Homework } from './../../homework/entities/homework.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import * as Joi from "joi"
import { JoiSchema } from "nestjs-joi"

@Entity()
export class Rate {
  @PrimaryColumn()
  @JoiSchema(Joi.number().required())
  homeworkId: number;

  @PrimaryColumn()
  @JoiSchema(Joi.number().required())
  studentId: number;

  @Column()
  @JoiSchema(Joi.number().required())
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
