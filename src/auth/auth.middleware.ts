import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers['authorization'];
      if (!authHeader) {
        throw new UnauthorizedException('Authorization header missing');
      }

      const token = authHeader.split(' ')[1]; // Bearer <token>
      if (!token) {
        throw new UnauthorizedException('Token missing');
      }

      // verify token
      const payload = jwt.verify(token, process.env.JWT_SECRET || 'secretKey');

      // เก็บข้อมูล user ลงใน req เพื่อใช้ใน controller
      req['user'] = payload;

      next();
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
