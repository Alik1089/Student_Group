import { Teacher } from './../../teacher/entities/teacher.entity';
import { Student } from './../../student/entities/student.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from './role.enum';
import * as Joi from "joi"
import { JoiSchema } from "nestjs-joi"

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @JoiSchema(Joi.number().required())
  id: number;

  @Column()
  @JoiSchema(Joi.string().required())
  name: string;

  @Column()
  @JoiSchema(Joi.string().required())
  surname: string;

  @Column()
  @JoiSchema(Joi.number().required())
  age: number;

  @Column()
  @JoiSchema(Joi.string().required())
  email: string;

  @Column()
  @JoiSchema(Joi.string().min(5).max(16).required())
  password: string;

  @Column()
  @JoiSchema(Joi.string().required())
  emailToken: string;
  
  @Column()
  @JoiSchema(Joi.string().required())
  image: string;
  
  @Column()
  @JoiSchema(Joi.string().required())
  isVerify: string;

  @Column()
  @JoiSchema(Joi.number().required())
  role: Role;

  @Column()
  @JoiSchema(Joi.string().required())
  phoneNumber: string;
  
  @OneToOne((type) => Student, (student) => student.user,{
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
  })
  student: Student;

  @OneToOne((type) => Teacher, (teacher) => teacher.user,{
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
  })
  teacher: Teacher;
}
