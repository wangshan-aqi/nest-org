import { Works } from './works-names.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  bookAuthor: string;

  @JoinTable()
  @ManyToMany((type) => Works, (booknames) => booknames.bookName)
  works: string[];
}
