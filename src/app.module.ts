import { Module } from '@nestjs/common';
import { ClientModule } from './clients/client.module';
import { AccountModule } from './accounts/account.module';
import { ManagerModule } from './managers/manager.module';

@Module({
  imports: [ClientModule, AccountModule, ManagerModule],
})
export class AppModule {}
