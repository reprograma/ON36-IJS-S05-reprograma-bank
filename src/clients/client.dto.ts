import {
  IsString,
  IsEmail,
  Length,
  Matches,
  IsNotEmpty,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { Role } from 'src/enum/role.enum';

export class CreateClientDto {
  @IsString()
  @Length(1, 100)
  name: string;

  @IsString()
  @Length(1, 255)
  address: string;

  @IsString()
  // @Matches(/^[\d\+\-\(\)\/\s]*$/, {
  //   message: 'Phone number can only contain numbers and special characters.',
  // })
  phoneNumber: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsString()
  @Length(6, 100)
  password: string;

  @IsOptional()
  @IsEnum(Role)
  role: number;

}

export class UpdateClientDto {
  readonly name?: string;
  readonly address?: string;
  readonly phoneNumber?: string;
  readonly email?: string;
  password?: string;
}

export class UpdatePasswordDto {
  @IsNotEmpty()
  new_password: string;

  @IsNotEmpty()
  old_password: string;
}
