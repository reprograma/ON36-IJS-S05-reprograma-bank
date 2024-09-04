import { Injectable, NotFoundException } from '@nestjs/common';
import { uuid } from 'uuidv4';
import { Client } from './client.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ClientRepository {
  private clients: Client[] = [];

  constructor(private prisma: PrismaService) {}

  // getAllClients(): Client[] {
  //   return this.clients;
  // }

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

  // getClientById(clientId: string): Client | null {
  //   const client = this.clients.find((client) => client.id === clientId) || null;
  //   return client;
  // }

  // async createClient(client: Client): Promise<Client> {
  //   client.id = uuid();
  //   this.clients.push(client);
  //   return client;
  // }

  // Criar um novo cliente
  async createClient(data: Prisma.ClientCreateInput): Promise<Client> {
    return this.prisma.client.create({
      data,
    });
  }

  async getClientById(clientId: string): Promise<Client | null> {
    const user = this.prisma.client.findUnique({
      where: { id: clientId },
    });

    if (!(await user)) {
      throw new NotFoundException(`${clientId}, nao encontrado`);
    }

    return user;
  }

  // Buscar todos os clientes
  async getAllClients(): Promise<Client[]> {
    return this.prisma.client.findMany();
  }

  async removeClient(clientId: string): Promise<void> {
    try {
      await this.prisma.client.delete({
        where: {
          id: clientId,
        },
      });
    } catch (error) {
      throw new NotFoundException(`Cliente com ID ${clientId} não encontrado.`);
    }
  }

  async getClientByEmail(email: string): Promise<Client | null> {
    return this.clients.find((client) => client.email === email) || null;
  }
}
