import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ToolsService } from 'src/utils/tools.service';

@Module({
  imports: [
    PassportModule.register({ session: true }),
    JwtModule.register({
      secret: '123456',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [AuthService, JwtStrategy, ToolsService],
  controllers: [AuthController],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
