import { Injectable } from '@nestjs/common';
import { uuid } from 'uuidv4';
import { TAccount } from './account.entity';

@Injectable()
export class AccountRepository {
  accounts: TAccount[] = [];

  createAccount(account: TAccount): TAccount {
    account.id = uuid();
    this.accounts.push(account);
    return account;
  }

  removeAccount(accountId: string): void {
    this.accounts = this.accounts.filter((account) => account.id !== accountId);
  }

  getAccountById(accountId: string): TAccount | null {
    const account = this.accounts.find((account) => account.id === accountId);
    return account;
  }
}
