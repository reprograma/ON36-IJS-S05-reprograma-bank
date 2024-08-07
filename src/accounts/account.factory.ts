import { Injectable } from '@nestjs/common';
import { AccountType } from './account-type.enum';
import { CheckingAccount, SavingsAccount } from './account.entity';
import { Client } from 'src/clients/client.entity';

@Injectable()
export class AccountFactory {
  createAccount(
    typeAccount: AccountType,
    client: Client,
  ): CheckingAccount | SavingsAccount {
    switch (typeAccount) {
      case AccountType.Checking:
        const checkingAccount = new CheckingAccount();
        checkingAccount.balance = 0;
        checkingAccount.overdraftLimit = 500;
        checkingAccount.client = client;
        checkingAccount.createdAt = new Date();
        checkingAccount.typeAccount = AccountType.Checking;
        return checkingAccount;
      case AccountType.Savings:
        const savingsAccount = new SavingsAccount();
        savingsAccount.balance = 0;
        savingsAccount.taxRate = 0.02;
        savingsAccount.typeAccount = AccountType.Savings;
        savingsAccount.client = client;
        savingsAccount.createdAt = new Date();
        return savingsAccount;
      default:
        throw new Error('Invalid account type');
    }
  }
}
