import { AccountFactory } from './account.factory';
import { AccountType } from './account-type.enum';
import { CheckingAccount, SavingsAccount } from './account.entity';
import { Client } from '../clients/client.entity';
import { Role } from 'src/enum/role.enum';

const client = new Client(
  'John',
  'Rua caxias',
  '12345678900',
  'teste@teste.com.br',
  '123456789',
  Role.Client,
);

/*
 * Jest:
 * describe, it/test
 */

describe('Account Factory', () => {
  test('should create a checking account', () => {
    const accountFactory = new AccountFactory();
    const retornado = accountFactory.createAccount(
      AccountType.Checking,
      client,
    );

    if (retornado instanceof CheckingAccount) {
      expect(retornado.balance).toBe(0);
      expect(retornado.overdraftLimit).toBe(500);
      expect(retornado.typeAccount).toBe(AccountType.Checking);
    }
  });

  test('should create a savings account', () => {
    const accountFactory = new AccountFactory();
    const retornado = accountFactory.createAccount(
      AccountType.Savings,
      client,
    ) as SavingsAccount;

    expect(retornado.balance).toBe(0);
    expect(retornado.taxRate).toBe(0.02);
    expect(retornado.typeAccount).toBe(AccountType.Savings);
  });

  //   test('should return an exception when an invalid type', () => {
  //     const accountFactory = new AccountFactory();
  //     const retornado = accountFactory.createAccount('invalid');
  //   });
});
