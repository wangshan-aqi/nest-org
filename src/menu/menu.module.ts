import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { Menu } from './entities/menu.entity';
import { Meta } from './entities/meta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Menu, Meta])],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}
