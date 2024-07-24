import { Rate } from './../../rate/entities/rate.entity';
import { Group } from './../../group/entities/group.entity';
import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Model } from 'src/module/entities/module.entity';

@Entity()
export class ModuleGroup {
  @PrimaryColumn()
  groupId: number;

  @PrimaryColumn()
  modelId: number;

  @ManyToOne((type) => Group, (group) => group.modulegroup, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'groupId' })
  group: Group;

  @ManyToOne((type) => Model, (group) => group.modulegroup, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'modelId' })
  model: Model;
}
