import { AllowedCategories } from './categories.enum';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@Unique(['title'])
export class Anime extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  synopsis: string;
  @Column({
    type: 'text',
    array: true,
    nullable: true,
  })
  genre: AllowedCategories[];
  @Column({ type: 'int' })
  ranked: number;
  @Column()
  score: number;
  @Column({ type: 'int' })
  userId: number;
  @Column({ default: 0 })
  episodes: number;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}
