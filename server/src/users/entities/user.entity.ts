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

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  age: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  emailToken: string;
  
  @Column()
  image: string;
  
  @Column()
  isVerify: string;

  @Column()
  role: Role;

  @Column()
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
