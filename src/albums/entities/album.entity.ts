import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Style } from './style.entity';

@Entity()
export class Album {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  artist: string;

  @Column()
  title: string;

  @Column()
  year: number;

  @JoinTable()
  @ManyToMany((type) => Style, (style) => style.albums, { cascade: true })
  styles: Style[];
}
