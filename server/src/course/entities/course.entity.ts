import { Model } from './../../module/entities/module.entity';
import { Column, Entity,  OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  duration: string;

  @OneToMany((type) => Model, (module) => module.course)
  module: Model[];
}
