import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientService } from '../clients/client.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Client } from '@prisma/client';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import * as bcrypt from 'bcryptjs';
import { Logger } from 'winston';


@Injectable()
export class AuthService {
  private issuer = 'login';
  private audience = 'cliente';
  constructor(
    private clientService: ClientService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    @Inject('winston') private readonly logger: Logger
    
  ) {}

  createToken(user: Client) {
    return {
      acessToken: this.jwtService.sign(
        //playload:
        {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        {
          expiresIn: '7 days',
          subject: user.id,
          issuer: this.issuer, // identifica o emissor do token, quem gerou o token
          audience: this.audience, // quem está autorizado a usar o token
        },
      ),
    };
  }

  checkToken(token: string) {
    try {
      const data = this.jwtService.verify(token, {
        audience: this.audience,
        issuer: this.issuer,
      });
      return data;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async login(email: string, password: string) {
    const user = await this.prisma.client.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      this.logger.error(`login falhou, usuário não encontrado`)
      throw new UnauthorizedException('Email e/ou senha incorretos.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Email e/ou senha incorretos.');
    }

    this.logger.info(`login com sucesso Id ${user.id}`)

    return this.createToken(user);
  }

  async register(data: AuthRegisterDTO) {
    const user = await this.clientService.createClient(data);
    const userClient = {
      id: user.id,
      name: user.name,
      address: user.address,
      phoneNumber: user.phoneNumber,
      email: user.email,
      password: user.password,
      role: user.role,
      managerId: user.managerId || null, // Ajuste para `null` se não existir
    };
    return this.createToken(userClient);
  }

  async forget(email: string) {
    const user = await this.prisma.client.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException(
        'Email está incorreto ou não cadastrado.',
      );
    }

    return true;
  }

  async reset(password: string, token: string) {
    //validar token
    const id = '0';
    const user = await this.prisma.client.update({
      where: {
        id: id,
      },
      data: {
        password,
      },
    });

    return this.createToken(user);
  }

 

  isValidToken(token: string) {
    try {
      this.checkToken(token);
      return true;
    } catch (e) {
      return false;
    }
  }
  // async validateClient(email: string, password: string): Promise<any> {
  //   const client = await this.clienchtService.validateClient(email, password);
  //   if (client) {
  //     const { password, ...result } = client;
  //     return result;
  //   }
  //   return null;
  // }

  // async login(client: any) {
  //   const payload = { email: client.email, sub: client.id };
  //   return {
  //     access_token: this.jwtService.sign(payload),
  //   };
  // }
  // async register(userDto: CreateClientDto): Promise<RegistrationStatus> {
  //   let status: RegistrationStatus = {
  //     success: true,
  //     message: 'ACCOUNT_CREATE_SUCCESS',
  //   };

  //   try {
  //     status.data = await this.clientService.createClient(userDto);
  //   } catch (err) {
  //     status = {
  //       success: false,
  //       message: err,
  //     };
  //   }
  //   return status;
  // }

  // async login(loginUserDto: AuthLoginDTO): Promise<any> {
  //   // find user in db
  //   const user = await this.clientService.validateClient(loginUserDto);

  //   // generate and sign token
  //   const token = this._createToken(user);

  //   return {
  //     ...token,
  //     data: user,
  //   };
  // }

  // private _createToken({ login }): any {
  //   const user: JwtPayload = { login };
  //   const Authorization = this.jwtService.sign(user);
  //   return {
  //     expiresIn: process.env.EXPIRESIN,
  //     Authorization,
  //   };
  // }

  // async validateUser(payload: JwtPayload): Promise<any> {
  //   const user = await this.clientService.validateClient(payload);
  //   if (!user) {
  //     throw new HttpException('INVALID_TOKEN', HttpStatus.UNAUTHORIZED);
  //   }
  //   return user;
  // }
}

// export interface RegistrationStatus {
//   success: boolean;
//   message: string;
//   data?: User;
// }
// export interface RegistrationSeederStatus {
//   success: boolean;
//   message: string;
//   data?: User[];
// }
