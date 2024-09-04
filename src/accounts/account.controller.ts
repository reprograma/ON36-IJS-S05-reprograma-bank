// src/accounts/account.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountType } from './account-type.enum';
import { ClientService } from '../clients/client.service';
import { CheckingAccount, SavingsAccount } from './account.entity';

@Controller('accounts')
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    private readonly clientService: ClientService,
  ) {}

  // @Post()
  // createAccount(
  //   @Body('type') type: AccountType,
  //   @Body('clientId') clientId: string,
  // ): CheckingAccount | SavingsAccount {
  //   const client = this.clientService.getClientById(clientId);
  //   const account = 1
  //   //this.accountService.createAccount(type, client);
  //   return account;
  // }
}
