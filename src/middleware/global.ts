// 全局中间件
import { Request, Response, NextFunction } from 'express';

const whiteList = ['/api/sign-up'];
export function MiddlewareAll(req: Request, res: Response, next: NextFunction) {
  if (whiteList.includes(req.originalUrl)) {
    next();
  } else {
    res.send('你是黑名单');
  }
}
