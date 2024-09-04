import { Injectable, NotFoundException } from '@nestjs/common';
import { ClientRepository } from './client.repository';
import { Client } from './client.entity';
import { IClient } from './client.interface';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateClientDto } from './client.dto';
import { createHash } from 'crypto';

@Injectable()
export class ClientService {
  public clients: Client[] = [];
  constructor(
    private clientRepository: ClientRepository,
    private readonly prisma: PrismaService,
  ) {}
  //  const passwordHash =  await bcrypt.hash(password, 10);

  async createClient(client: IClient): Promise<Client> {
    const { name, address, phoneNumber, email, password, role } = client;

    const salt = await bcrypt.genSalt(10);

    const passwordHash = await bcrypt.hash(password, salt);

    return this.clientRepository.createClient({
      name,
      address,
      phoneNumber,
      email,
      password: passwordHash,
      role,
    });
  }

  // async validateClient(
  //   email: string,
  //   password: string,
  // ): Promise<Client | null> {
  //   const client = await this.clientRepository.getClientByEmail(email);
  //   if (client && (await bcrypt.compare(password, client.password))) {
  //     return client;
  //   }
  //   return null;
  // }

  async updateClient(
    clientId: string,
    updateClientDto: UpdateClientDto,
  ): Promise<Client> {

    const { name, address, phoneNumber, email, password } = updateClientDto;
    const existingClient = await this.prisma.client.findUnique({
      where: { id: clientId },
    });
    if (!existingClient) {
      throw new NotFoundException('Client not found');
    }

    const salt = await bcrypt.genSalt();
    if (password) {
      updateClientDto.password = await bcrypt.hash(
        updateClientDto.password,
        salt,
      );
    }

    return this.prisma.client.update({
      where: { id: clientId },
      data: {
        name,
        email,
        address,
        phoneNumber,
        password: updateClientDto.password
      },
    });
  }

  removeClient(clientId: string): void {
    this.clientRepository.removeClient(clientId);
  }

  // Lógica de busca de todos os clientes
  async getAllClients(): Promise<Client[]> {
    return this.clientRepository.getAllClients();
  }

  getClientsByManagerId(clientId: string): Client[] {
    return this.clientRepository.getClientsByManagerId(clientId);
  }

  async getClientById(clientId: string): Promise<Client | null> {
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
