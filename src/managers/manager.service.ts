import { Injectable, NotFoundException } from '@nestjs/common';
import { TAccount } from '../accounts/account.entity';
import { Manager } from './manager.entity';
import { Client } from '../clients/client.entity';
import { AccountType } from '../accounts/account-type.enum';
import { AccountService } from '../accounts/account.service';
import { ManagerRepository } from './manager.repository';
import { ClientService } from '../clients/client.service';

@Injectable()
export class ManagerService {
  constructor(
    private managerRepository: ManagerRepository,
    private clientService: ClientService,
    private accountService: AccountService,
  ) {}

  getAllManagers(): Manager[] {
    return this.managerRepository.getAllManagers();
  }

  getManagerById(managerId: string): Manager {
    const manager = this.managerRepository.findManagerById(managerId);

    if (!manager) {
      throw new NotFoundException({ message: 'Manager not found' });
    }

    return manager;
  }

  createManager(manager: Manager): Manager {
    return this.managerRepository.createManager(manager);
  }

  removeManager(managerId: string): void {
    this.managerRepository.removeManager(managerId);
  }

  // addClient(managerId: string, client: Client): Client {
  //   const manager = this.managerRepository.findManagerById(managerId);
  //   client.manager = manager;
  //   return this.clientService.createClient(client);
  // }

  removeClient(managerId: string, clientId: string): void {
    const client = this.clientService.getClientByIdAndManagerId(
      clientId,
      managerId,
    );
    this.clientService.removeClient(client.id);
  }

  getClientsByManagerId(managerId: string): Client[] {
    return this.clientService.getClientsByManagerId(managerId);
  }

  async openAccount(
    managerId: string,
    clientId: string,
    type: AccountType,
  ): Promise<TAccount> {
    const client = await this.clientService.getClientById(clientId);

    const manager = this.managerRepository.findManagerById(managerId);
    client.manager = manager;

    return this.accountService.createAccount(type, client);
  }

  closeAccount(managerId: string, accountId: string): void {
    if (!this.isClientAssignedToManager(managerId, accountId)) {
      throw new Error('Client does not belong to manager');
    }

    this.accountService.deleteAccount(accountId);
  }

  modifyAccountType(
    managerId: string,
    accountId: string,
    newType: AccountType,
  ): TAccount {
    if (!this.isClientAssignedToManager(managerId, accountId)) {
      throw new Error('Client does not belong to manager');
    }

    return this.accountService.changeAccountType(accountId, newType);
  }

  private isClientAssignedToManager(
    accountId: string,
    managerId: string,
  ): boolean {
    const client = this.clientService.getClientByAccountId(accountId);
    const manager = this.getManagerById(managerId);

    if (client.manager && client.manager.id !== manager.id) {
      throw new Error('Client does not belong to manager');
    }

    return true;
  }
}
