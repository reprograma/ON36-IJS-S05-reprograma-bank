import { AuthModule } from './auth/auth.module';

import { Module, forwardRef } from '@nestjs/common';
import { ClientModule } from './clients/client.module';
import { AccountModule } from './accounts/account.module';
import { ManagerModule } from './managers/manager.module';
import { PrismaModule } from './prisma/prisma.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [{
        ttl: 60,
        limit: 5
      }
      ],
    }),
    AccountModule,
    ManagerModule,
    forwardRef(() => PrismaModule),
    forwardRef(() => ClientModule),
    forwardRef(() => AuthModule),
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.prettyPrint(),
            winston.format.colorize({ all: true })
          ),
        }),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
      ]
    }),
  ],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
