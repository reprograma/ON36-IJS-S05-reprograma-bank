import { Injectable } from '@nestjs/common';
import { ClientRepository } from './client.repository';
import { Client } from './client.entity';
import { IClient } from './client.interface';

@Injectable()
export class ClientService {
  public clients: Client[] = [];
  constructor(private clientRepository: ClientRepository) {}

  createClient(client: IClient): Client {
    const { name, address, phoneNumber } = client;
    return this.clientRepository.createClient({
      name,
      address,
      phoneNumber,
    });
  }

  removeClient(clientId: string): void {
    this.clientRepository.removeClient(clientId);
  }

  getAllClients(): Client[] {
    return this.clientRepository.getAllClients();
  }

  getClientsByManagerId(clientId: string): Client[] {
    return this.clientRepository.getClientsByManagerId(clientId);
  }

  getClientById(clientId: string): Client | null {
    return this.clientRepository.getClientById(clientId);
  }

  getClientByAccountId(accountId: string): Client | null {
    return this.clientRepository.getClientByAccountId(accountId);
  }

  getClientByIdAndManagerId(
    clientId: string,
    managerId: string,
  ): Client | null {
    return this.clientRepository.getClientByIdAndManagerId(clientId, managerId);
  }
}
