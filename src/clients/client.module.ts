import { AuthModule } from './../auth/auth.module';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  forwardRef,
} from '@nestjs/common';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { ClientRepository } from './client.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { IdCheckMiddleware } from 'src/middlewares/id-check-middleware';
import { VerificarTokenUserMiddleware } from 'src/middlewares/verificar-token-user.middleware';


@Module({
  imports: [PrismaModule, forwardRef(() => AuthModule)],
  controllers: [ClientController],
  providers: [ClientService, ClientRepository],
  exports: [ClientService, ClientRepository],
})
export class ClientModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(IdCheckMiddleware).forRoutes({
      path: 'clients/:id',
      method: RequestMethod.ALL,
    });
    consumer.apply(VerificarTokenUserMiddleware).forRoutes({
      path: 'clients/id',
      method: RequestMethod.ALL,
    })
  }

}
