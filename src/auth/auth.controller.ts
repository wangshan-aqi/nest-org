import { AuthService } from './auth.service';
import { Body, Controller, Get, Post, Req, Res, Session } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import svgCaptcha from 'svg-captcha';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('authCode')
  createCode(@Req() req, @Res() res, @Session() session) {
    const Captcha = svgCaptcha.create({
      size: 4,
      fontSize: 50,
      width: 100,
      height: 34,
      background: '#cc9966',
    });
    session.code = Captcha.text;
    res.type('image/svg+xml');
    res.send(Captcha.data);
  }
  @Post('/signUp')
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }
  @Post('/signIn')
  signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }
}
