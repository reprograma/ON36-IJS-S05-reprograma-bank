import { IsString, IsEmail, Length, Matches, IsOptional, IsEnum } from 'class-validator';
import { Account } from '../accounts/account.entity';
import { Manager } from '../managers/manager.entity';
import { IClient } from './client.interface';
import { Role } from 'src/enum/role.enum';

export class Client implements IClient {
  @IsOptional()
  @IsString()
  id?: string;

  @IsString()
  @Length(1, 100)
  name: string;

  @IsString()
  @Length(1, 255)
  address: string;

  @IsString()
  @Matches(/^[\d\+\-\(\)\/\s]*$/, {
    message: 'Phone number can only contain numbers and special characters.',
  })
  phoneNumber: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 100)
  password: string;

  @IsOptional()
  accounts?: Account[];

  @IsOptional()
  manager?: Manager;

  @IsOptional()
  managerId?: string;


  @IsEnum(Role)
  role: number;

  constructor(name: string, address: string, phoneNumber: string, email: string, password: string, role: number) {
    this.name = name;
    this.address = address;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.password = password;
    this.accounts = [];
    this.manager = null;
    this.role = role
  }
}
