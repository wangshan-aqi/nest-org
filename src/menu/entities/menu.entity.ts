import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, TreeChildren } from 'typeorm';
import { Meta } from './meta.entity';

@Entity()
export class Menu {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @Column()
  path: string;

  @OneToOne(() => Meta)
  @JoinColumn()
  meta: Meta;

  @TreeChildren()
  children: Menu[];
}
