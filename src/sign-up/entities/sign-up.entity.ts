import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, TreeChildren } from 'typeorm';

@Entity()
export class SignUp {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  username: string;

  @Column()
  createName: string;

  @Column()
  password: string;

  @Column()
  telPhone: string;

  @Column()
  email: string;

  @Column()
  age: number;

  @Column()
  idCard: number;
}
