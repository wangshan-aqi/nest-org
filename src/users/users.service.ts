import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersEntity } from './entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersDto } from './dto/users.dto';
import { User } from './users.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {}
  async create(usersDto: UsersDto): Promise<User> {
    const user = this.usersRepository.create(usersDto);

    return this.usersRepository.save(user);
  }
  async findAll(): Promise<User[]> {
    const curUser = await this.usersRepository.find({
      comment: 'users',
    });
    return curUser;
  }

  async findOne(id: number): Promise<User> {
    const curUser = await this.usersRepository.findOne({
      comment: 'users',
      where: {
        id: id,
      },
    });
    return curUser;
  }

  async update(id: number, usersDto: UsersDto) {
    const user = await this.usersRepository.preload({
      id: +id,
      ...usersDto,
    });
    if (!user) {
      throw new NotFoundException('id 未找到');
    }
    return this.usersRepository.save(user);
  }

  async remove(id: number) {
    const curUser = await this.usersRepository.findOne({
      comment: 'users',
      where: {
        id: +id,
      },
    });
    if (!curUser) {
      throw new NotFoundException('id 未找到');
    }
    return this.usersRepository.delete(curUser);
  }
}
