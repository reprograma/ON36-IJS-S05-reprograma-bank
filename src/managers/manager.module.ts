import { Module } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { ManagerController } from './manager.controller';
import { ManagerRepository } from './manager.repository';
import { AccountModule } from '../accounts/account.module';
import { ClientModule } from '../clients/client.module';

@Module({
  imports: [AccountModule, ClientModule],
  controllers: [ManagerController],
  providers: [ManagerService, ManagerRepository],
  exports: [ManagerService, ManagerRepository],
})
export class ManagerModule {}
