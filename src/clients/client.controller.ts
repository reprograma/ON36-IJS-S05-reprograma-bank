import {
  Controller,
  Get,
  Post,
  Body,
  BadRequestException,
  Param,
  Delete,
  UseGuards,
  Patch,
  Req,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto, UpdateClientDto } from './client.dto';
import { Client } from './client.entity';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enum/role.enum';
import { AuthGuard } from 'src/guards/auth.guard';
import { Request } from 'express';

//@UseInterceptors(LogInterceptor)
// @UseGuards(AuthGuard, RoleGuard)
@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  async createClient(
    @Body() createClientDto: CreateClientDto,
  ): Promise<Client> {
    console.log('create cliente', createClientDto);
    try {
      // Chama o serviço para criar o cliente
      return await this.clientService.createClient(createClientDto);
    } catch (error) {
      // Manipulação personalizada de erros, se necessário
      throw new BadRequestException('Failed to create client');
    }
  }

  @Roles(Role.Manager)
  @Get()
  async getAllClients(): Promise<Client[]> {
    return this.clientService.getAllClients();
  }

  @Get(':id')
  async getClientById(@Param('id') id: string): Promise<Client | null> {
    return this.clientService.getClientById(id);
  }


  @Roles(Role.Client)
  @Delete()
  async removeClient(@Param('id') clientId: string): Promise<void> {
    return this.clientService.removeClient(clientId);
  }

  @UseGuards(AuthGuard)
  @Roles(Role.Client)
  @Patch()
  async updateClient(
    @Body() updateClientDto: UpdateClientDto,
    @Req() req: Request,
  ): Promise<Client> {
    const userIdFromToken = req['user']?.id;

    return await this.clientService.updateClient(
      userIdFromToken,
      updateClientDto,
    );
  }
}
