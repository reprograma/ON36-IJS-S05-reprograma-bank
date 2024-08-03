import { AccountFactory } from './account.factory';
import { AccountType } from './account-type.enum';
import { CheckingAccount, SavingsAccount } from './account.entity';

/*
 * Jest:
 * describe, it/test
 */

describe('Account Factory', () => {
  test('should create a checking account', () => {
    const accountFactory = new AccountFactory();
    const retornado = accountFactory.createAccount(AccountType.Checking);

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
