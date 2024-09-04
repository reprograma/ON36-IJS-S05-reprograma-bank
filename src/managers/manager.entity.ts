import { Client } from '../clients/client.entity';

export class Manager {
  id?: string;
  name: string;
  clients: Client[];

  constructor(name: string) {
    this.name = name;
    this.clients = [];
  }
}
