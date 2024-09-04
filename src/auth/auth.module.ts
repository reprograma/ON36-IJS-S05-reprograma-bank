/*
https://docs.nestjs.com/modules
*/

import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
// import { JwtStrategy } from './jwt.strategy';
import { ClientModule } from '../clients/client.module';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { env } from 'process';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: env.SECRETKEY, // Utilize variáveis de ambiente
      signOptions: { expiresIn: '60m' },
    }),
    forwardRef(() => ClientModule),
    PrismaModule
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
