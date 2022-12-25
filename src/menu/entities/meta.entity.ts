import { Column, Entity, OneToMany, PrimaryGeneratedColumn, TreeChildren } from 'typeorm';

@Entity()
export class Meta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  icon: string;

  @Column()
  keeplive: boolean;

  @Column()
  role: number;
}
