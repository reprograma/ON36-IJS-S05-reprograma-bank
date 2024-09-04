import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { Client } from '../clients/client.entity';
import { Manager } from '../managers/manager.entity';
import { AccountType } from '../accounts/account-type.enum';
import { TAccount } from 'src/accounts/account.entity';

@Controller('managers')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  // @Get('')
  // getAllManagers(): Manager[] {
  //   return this.managerService.getAllManagers();
  // }

  // @Get(':managerId')
  // getManagerById(@Param('managerId') managerId: string): Manager {
  //   return this.managerService.getManagerById(managerId);
  // }

  // @Post()
  // createManager(@Body() manager: Manager): Manager {
  //   return this.managerService.createManager(manager);
  // }

  // @Delete(':managerId')
  // removeManager(@Param('managerId') managerId: string): void {
  //   this.managerService.removeManager(managerId);
  // }

  // @Post(':managerId/clients')
  // addClient(
  //   @Param('managerId') managerId: string,
  //   @Body() client: Client,
  // ): Client {
  //   return this.managerService.addClient(managerId, client);
  // }

  // @Delete(':managerId/clients/:clientId')
  // removeClient(
  //   @Param('managerId') managerId: string,
  //   @Param('clientId') clientId: string,
  // ): void {
  //   return this.managerService.removeClient(managerId, clientId);
  // }

  // @Get(':managerId/clients')
  // getClientsByManagerId(@Param('managerId') managerId: string): Client[] {
  //   return this.managerService.getClientsByManagerId(managerId);
  // }

  // @Post(':managerId/clients/:clientId/accounts')
  // openAccount(
  //   @Param('managerId') managerId: string,
  //   @Param('clientId') clientId: string,
  //   @Body('type') type: AccountType,
  // ): TAccount {
  //   return this.managerService.openAccount(managerId, clientId, type);
  // }

  // @Delete(':managerId/accounts/:accountId')
  // closeAccount(
  //   @Param('managerId') managerId: string,
  //   @Param('accountId') accountId: string,
  // ): void {
  //   return this.managerService.closeAccount(managerId, accountId);
  // }

  // @Post(':managerId/accounts/:accountId/change-type')
  // modifyAccountType(
  //   @Param('managerId') managerId: string,
  //   @Param('accountId') accountId: string,
  //   @Body('newType') newType: AccountType,
  // ): TAccount {
  //   return this.managerService.modifyAccountType(managerId, accountId, newType);
  // }
}
