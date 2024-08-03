import { Injectable } from '@nestjs/common';
import { AccountRepository } from './account.repository';
import { TAccount } from './account.entity';
import { AccountType } from './account-type.enum';
import { AccountFactory } from './account.factory';
import { Client } from '../clients/client.entity';

@Injectable()
export class AccountService {
  constructor(
    private accountRepository: AccountRepository,
    private accountFactory: AccountFactory,
  ) {}

  createAccount(type: AccountType, client: Client): TAccount {
    const account = this.accountFactory.createAccount(type, client);
    return this.accountRepository.createAccount(account);
  }

  changeAccountType(accountId: string, newType: AccountType): TAccount {
    const account = this.accountRepository.getAccountById(accountId);
    const client = account.client;
    this.deleteAccount(accountId);
    return this.createAccount(newType, client);
  }

  deleteAccount(accountId: string): void {
    this.accountRepository.removeAccount(accountId);
  }
}
