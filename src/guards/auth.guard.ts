/*
https://docs.nestjs.com/guards#guards
*/

import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { ClientService } from 'src/clients/client.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly clientService: ClientService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const { authorization } = req.headers;

    try {
      const data = this.authService.checkToken(
        (authorization ?? '').split(' ')[1],
      );
      req.tokenPayload = data;

      req.user = await this.clientService.getClientById(data.id);

      return true;
    } catch (e) {
       throw new UnauthorizedException('Token invalido ou não existe');
    }
  }
}
