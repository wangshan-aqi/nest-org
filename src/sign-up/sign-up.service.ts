import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSignUpDto } from './dto/create-sign-up.dto';
import { UpdateSignUpDto } from './dto/update-sign-up.dto';
import { SignUp } from './entities/sign-up.entity';

@Injectable()
export class SignUpService {
  constructor(@InjectRepository(SignUp) private readonly signUp: Repository<SignUp>) {}

  async create(createSignUpDto: CreateSignUpDto) {
    console.log(createSignUpDto, 'createSignUpDto');

    const userInfo = new SignUp();
    userInfo.username = createSignUpDto.username;
    userInfo.createName = createSignUpDto.createName;
    userInfo.age = createSignUpDto.age;
    userInfo.password = createSignUpDto.password;
    userInfo.telPhone = createSignUpDto.telPhone;
    userInfo.email = createSignUpDto.email;
    userInfo.idCard = createSignUpDto.idCard;
    await this.signUp.save(userInfo);
    return {
      code: 200,
      msg: '注册成功',
      data: null,
    };
  }

  findAll() {
    return `This action returns all signUp`;
  }

  findOne(id: number) {
    return `This action returns a #${id} signUp`;
  }

  update(id: number, updateSignUpDto: UpdateSignUpDto) {
    return `This action updates a #${id} signUp`;
  }

  remove(id: number) {
    return `This action removes a #${id} signUp`;
  }
}
