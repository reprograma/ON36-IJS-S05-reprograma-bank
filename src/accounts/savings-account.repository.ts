import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SavingsAccount } from './account.entity';

@Injectable()
export class SavingsAccountRepository extends Repository<SavingsAccount> {}
