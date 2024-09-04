import { BadRequestException, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export class IdCheckMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Verifica se o parâmetro 'id' é um número válido
    console.log('antes IdCheckMiddleware');
    if (Number(req.params.id) <= 0) {
      throw new BadRequestException('ID inválido!');
    }
    console.log('depois IdCheckMiddleware');
    // Continue para o próximo middleware ou rota
    next();
  }
}
