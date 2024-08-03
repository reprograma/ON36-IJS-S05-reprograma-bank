import { Injectable } from '@nestjs/common';
import { uuid } from 'uuidv4';
import { Client } from './client.entity';

@Injectable()
export class ClientRepository {
  private clients: Client[] = [];

  constructor() {}

  getAllClients(): Client[] {
    return this.clients;
  }

  getClientsByManagerId(managerId: string): Client[] {
    return this.clients.filter((client) => client.manager.id === managerId);
  }

  getClientByIdAndManagerId(
    clientId: string,
    managerId: string,
  ): Client | null {
    const client = this.clients.find(
      (client) => client.id === clientId && client.manager.id === managerId,
    );

    return client;
  }

  getClientByAccountId(accountId: string): Client | null {
    const client = this.clients.find((client) => {
      return client.accounts.some((account) => account.id === accountId);
    });

    return client;
  }

  getClientById(clientId: string): Client | null {
    const client = this.clients.find((client) => client.id === clientId);
    return client;
  }

  createClient(client: Client): Client {
    client.id = uuid();
    this.clients.push(client);
    return client;
  }

  removeClient(clientId: string): void {
    this.clients = this.clients.filter((client) => client.id !== clientId);
  }
}
