import { Account } from '../accounts/account.entity';
import { Manager } from '../managers/manager.entity';
import { IClient } from './client.interface';

export class Client implements IClient {
  id?: string;
  name: string;
  address: string;
  phoneNumber: string;
  accounts?: Account[];
  manager?: Manager;

  constructor(name: string, address: string, phoneNumber: string) {
    this.name = name;
    this.address = address;
    this.phoneNumber = phoneNumber;
    this.accounts = [];
    this.manager = null;
  }
}
