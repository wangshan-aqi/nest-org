import { Repository } from 'typeorm';
import { Book } from './book.entity';

export class BookRepository extends Repository<Book> {}
