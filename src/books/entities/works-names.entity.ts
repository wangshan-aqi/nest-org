import { Book } from './book.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Works {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bookName: string;

  @ManyToMany((type) => Book, (books) => books.works)
  books: Book[];
}
