import { Group } from './../../group/entities/group.entity';
import { Course } from './../../course/entities/course.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Homework } from 'src/homework/entities/homework.entity';
import { ModuleGroup } from 'src/module-group/entities/module-group.entity';

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

  @OneToMany((type) => Group, (group) => group.module)
  group: Group[];

  @OneToMany((type) => Homework, (homework) => homework.model)
  homework: Homework[];
  
  @OneToMany((type) => ModuleGroup, (module) => module.model, {
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
  })
  modulegroup: ModuleGroup[];
}
