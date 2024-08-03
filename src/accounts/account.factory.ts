import { Injectable } from '@nestjs/common';
import { AccountType } from './account-type.enum';
import { CheckingAccount, SavingsAccount } from './account.entity';

@Injectable()
export class AccountFactory {
  createAccount(typeAccount: AccountType): CheckingAccount | SavingsAccount {
    switch (typeAccount) {
      case AccountType.Checking:
        const checkingAccount = new CheckingAccount();
        checkingAccount.balance = 0;
        checkingAccount.overdraftLimit = 500;
        checkingAccount.typeAccount = AccountType.Checking;
        return checkingAccount;
      case AccountType.Savings:
        const savingsAccount = new SavingsAccount();
        savingsAccount.balance = 0;
        savingsAccount.taxRate = 0.02;
        savingsAccount.typeAccount = AccountType.Savings;
        return savingsAccount;
      default:
        throw new Error('Invalid account type');
    }
  }
}
