import { AccountService } from './account.service';
import { Client } from '../clients/client.entity';
import { AccountType } from './account-type.enum';
import { AccountRepository } from './account.repository';
import { AccountFactory } from './account.factory';
import { CheckingAccount } from './account.entity';
import { uuid } from 'uuidv4';
import { Role } from 'src/enum/role.enum';

jest.mock('uuidv4');

const client = new Client('John',
'Rua caxias',
'12345678900',
'teste@teste.com.br',
'123456789',
Role.Client,);
const mockedDate = new Date(2000, 9, 1, 7);

describe('Account Service', () => {
  test('should create an account', () => {
    // const accountRepository = new AccountRepository();
    // const accountFactory = new AccountFactory();

    const accountRepository = new AccountRepository();
    const accountFactory = new AccountFactory();
    const accountService = new AccountService(
      accountRepository,
      accountFactory,
    );

    const esperado = new CheckingAccount();
    esperado.balance = 0;
    esperado.typeAccount = AccountType.Checking;
    esperado.client = client;
    esperado.overdraftLimit = 500;
    esperado.createdAt = mockedDate;
    esperado.id = '123';

    // 132871ac-a76a-40fb-874a-17c41cc76d8c
    (uuid as jest.Mock).mockReturnValue('123');

    jest.spyOn(global, 'Date').mockImplementation(() => {
      return mockedDate;
    });

    // (Date as jest.Mock).mockReturnValue('2024-08-03T18:35:35.756Z');

    const resultado = accountService.createAccount(
      AccountType.Checking,
      client,
    );

    expect(resultado).toStrictEqual(esperado);

    // expect(resultado).toStrictEqual(expect.objectContaining(esperado));

    // expect(resultado).toStrictEqual(expect.objectContaining(esperado));
  });
});
