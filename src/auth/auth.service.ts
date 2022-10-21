import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { UsersRepository } from './users.repository';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    // hash
    const salt = await bcrypt.genSalt();

    const hashenPassword = await bcrypt.hash(password, salt);

    const user = this.usersRepository.create({ username, password: hashenPassword });
    try {
      await this.usersRepository.save(user);
    } catch (error) {
      // duolicate username
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialsDto;
    const user = await this.usersRepository.findOne({ where: { username } });
    if (user && (await bcrypt.compare(password, user.password))) {
      // return 'success'
      const payload: JwtPayload = { username };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      // throw new UnauthorizedException('please check your login credentials')
      throw new UnauthorizedException('请检查您的登录凭据');
    }
  }
}
