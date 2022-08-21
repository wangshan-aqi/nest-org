import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { Book } from './entities/book.entity';
import { Works } from './entities/works-names.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Works])],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
