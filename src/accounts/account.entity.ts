import { AccountType } from './account-type.enum';
import { Client } from '../clients/client.entity';

export type TAccount = CheckingAccount | SavingsAccount;

export abstract class Account {
  id: string;

  typeAccount: AccountType.Checking | AccountType.Savings;

  balance: number;

  client: Client;

  createdAt: Date;

  getBalance(): number {
    return this.balance;
  }

  deposit(value: number): void {
    this.balance += value;
  }

  withdraw(value: number): void {
    if (value <= this.balance) {
      this.balance -= value;
      return;
    }

    throw new Error('Saldo insuficiente');
  }

  abstract transfer(destino: Account, value: number): void;
}

export class CheckingAccount extends Account {
  overdraftLimit: number;

  getBalance(): number {
    return this.balance + this.overdraftLimit;
  }

  transfer(destiny: Account, value: number): void {
    if (value <= this.getBalance()) {
      this.withdraw(value);
      destiny.deposit(value);
      return;
    }

    throw new Error('Saldo insuficiente para transferência.');
  }
}

export class SavingsAccount extends Account {
  taxRate: number;

  transfer(destiny: Account, value: number): void {
    if (value <= this.balance) {
      this.withdraw(value);
      destiny.deposit(value);
      return;
    }

    throw new Error('Saldo insuficiente para transferência.');
  }
}
