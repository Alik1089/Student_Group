import { Group } from './../../group/entities/group.entity';
import { Course } from './../../course/entities/course.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Model {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()     
  name: string;

  @ManyToOne((type) => Course, (course) => course.module)
  course: Course;

  @OneToMany((type) => Group, (group) => group.module)
  group: Group[];
}
