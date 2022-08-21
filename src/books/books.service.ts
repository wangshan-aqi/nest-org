import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}
  async create(createBookDto: CreateBookDto) {
    const book = await this.bookRepository.create(createBookDto);

    const isBook = await this.bookRepository.findOne({
      comment: 'book',
      where: {
        email: createBookDto.email && createBookDto.email,
      },
    });
    if (isBook) {
      throw new NotImplementedException({
        status: 404,
        msg: '用户邮箱已存在',
      });
    }
    return this.bookRepository.save(book || isBook);
  }

  async findAll() {
    return await this.bookRepository.find({
      relations: ['works'],
    });
  }

  async findOne(id: number) {
    const book = await this.bookRepository.findOne({
      comment: 'book',
      where: {
        id: +id,
      },
      relations: ['works'],
    });
    if (!book) {
      throw new NotImplementedException({
        status: 404,
        msg: 'id 不存在',
      });
    }
    return book;
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    const book = await this.bookRepository.preload({
      id: +id,
      ...updateBookDto,
    });
    if (!book) {
      throw new NotImplementedException({
        status: 404,
        msg: 'id 不存在',
      });
    }
    return this.bookRepository.save(book);
  }

  async remove(id: number): Promise<any> {
    const curBook = await this.bookRepository.findOne({
      comment: 'book',
      where: {
        id: +id,
      },
      relations: ['works'],
    });
    if (!curBook) {
      throw new NotImplementedException({
        status: 404,
        msg: 'id 不存在',
      });
    }
    return this.bookRepository.delete(id);
  }
}
