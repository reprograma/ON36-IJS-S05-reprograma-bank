/*
https://docs.nestjs.com/middleware#middleware
*/

import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { env } from 'process';
import * as jwt from 'jsonwebtoken';
import { UserCliente } from 'src/clients/client.interface';


// declare global {
//   namespace Express {
//     interface Request {
//       user?: UserCliente;
//     }
//   }
// }




@Injectable()
export class VerificarTokenUserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header is missing' });
    }

    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, env.SECRETKEY) as UserCliente; 
      req['user'] = decoded; 
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    next();
  }
}
