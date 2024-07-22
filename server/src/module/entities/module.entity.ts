import { Group } from './../../group/entities/group.entity';
import { Course } from './../../course/entities/course.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Model {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()     
  name: string;

  @Column()
  courseId:number

  @ManyToOne((type) => Course, (course) => course.module, {
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
  })
  @JoinColumn({name:"courseId"})
  course: Course;

  @OneToMany((type) => Group, (group) => group.module,  {
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
  })
  group: Group[];
}
