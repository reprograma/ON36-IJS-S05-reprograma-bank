import { Injectable } from '@nestjs/common';
import { uuid } from 'uuidv4';
import { Manager } from './manager.entity';

@Injectable()
export class ManagerRepository {
  private managers: Manager[] = [];

  constructor() {}

  getAllManagers(): Manager[] {
    return this.managers;
  }

  createManager(manager: Manager): Manager {
    manager.id = uuid();
    this.managers.push(manager);
    return manager;
  }

  findManagerById(managerId: string): Manager | null {
    const manager = this.managers.find((manager) => manager.id === managerId);
    return manager;
  }

  removeManager(managerId: string): void {
    this.managers = this.managers.filter((manager) => manager.id !== managerId);
  }
}
