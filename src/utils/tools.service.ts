import { Injectable } from '@nestjs/common';
import * as svgCaptcha from 'svg-captcha';

@Injectable()
export class ToolsService {
  captche(size = 4) {
    const captcha = svgCaptcha.create({
      size, // 生成几个验证码
      fontSize: 50, // 字体大小
      width: 100, // 宽度
      height: 34, // 高度
      // background: `#${Math.floor(Math.random() * 16777215).toString(16)}`, // 背景颜色
      background: '#cc9966', // 背景颜色
    });
    return captcha;
  }
}
