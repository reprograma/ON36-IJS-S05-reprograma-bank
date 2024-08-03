import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { ClientRepository } from './client.repository';

@Module({
  imports: [],
  controllers: [ClientController],
  providers: [ClientService, ClientRepository],
  exports: [ClientService, ClientRepository],
})
export class ClientModule {}
