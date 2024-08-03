import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { AccountRepository } from './account.repository';
import { AccountFactory } from './account.factory';
import { ClientModule } from '../clients/client.module';

@Module({
  imports: [ClientModule],
  controllers: [AccountController],
  providers: [AccountService, AccountFactory, AccountRepository],
  exports: [AccountService, AccountFactory, AccountRepository],
})
export class AccountModule {}
