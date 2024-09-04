// import { Injectable } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { AuthService } from './auth.service';

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor(private readonly authService: AuthService) {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       ignoreExpiration: false,
//       secretOrKey: 'your_secret_key', // Altere para usar variáveis de ambiente
//     });
//   }

//   async validate(payload: JwtPayload): Promise<any> {
//     // const user = await this.authService.validateUser(payload);
//     // if (!user) {
//     //   throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
//     // }
//     // return user;
//     return true
//   }
// }

// export interface JwtPayload {  login: string;}