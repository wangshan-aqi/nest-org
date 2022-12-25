import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from './entities/menu.entity';
import { Meta } from './entities/meta.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu) private readonly menu: Repository<Menu>,
    @InjectRepository(Meta) private readonly meta: Repository<Meta>,
  ) {}
  async create(createMenuDto: CreateMenuDto) {
    const curmeta = new Meta();
    curmeta.icon = createMenuDto.meta.icon;
    curmeta.keeplive = createMenuDto.meta.keeplive;
    curmeta.role = createMenuDto.meta.role;
    await this.meta.save(curmeta);

    const data = new Menu();
    data.name = createMenuDto.name;
    data.path = createMenuDto.path;
    data.meta = curmeta;
    await this.menu.save(data);

    return '新建成功';
  }

  findAll() {
    const route = this.menu.find({ relations: ['meta'] });
    console.log(route);

    return route;
  }

  findOne(id: number) {
    return `This action returns a #${id} menu`;
  }

  update(id: number, updateMenuDto: UpdateMenuDto) {
    return `This action updates a #${id} menu`;
  }

  remove(id: number) {
    return `This action removes a #${id} menu`;
  }
}
