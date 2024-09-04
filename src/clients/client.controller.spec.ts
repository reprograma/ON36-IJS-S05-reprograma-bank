import * as supertest from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../app.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { Role } from 'src/enum/role.enum';
import { ClientController } from './client.controller';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { ClientRepository } from './client.repository';


describe('Client Controller', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule, AuthModule], 
      providers: [PrismaService, ClientRepository],
      controllers: [ClientController],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  test('should create a client', () => {
    const name = 'John Doe';
    const address = '123 Main St';
    const phoneNumber = '555-555-5555';
    const email = 'email@teste.com';
    const password = '123456789';
    const role = Role.Client;

    return supertest(app.getHttpServer())
      .post('/clients')
      .send({
        name,
        address,
        phoneNumber,
        email,
        password,
        role,
      })
      .expect(201)
      .expect(({ body }) => {
        expect(body.name).toBe(name);
        expect(body.address).toBe(address);
        expect(body.phoneNumber).toBe(phoneNumber);
      });
  });

  // test('should get all clients', async () => {
  //   const name = 'John Doe';
  //   const address = '123 Main St';
  //   const phoneNumber = '555-555-5555';
  //   const email = 'email@teste.com';
  //   const password = '123456789';
  //   const role = Role.Client;

  //   await supertest(app.getHttpServer()).post('/clients').send({
  //     name,
  //     address,
  //     phoneNumber,
  //     email,
  //     password,
  //     role,
  //   });

  //   return supertest(app.getHttpServer())
  //     .get('/clients')
  //     .expect(200)
  //     .expect(({ body }) => {
  //       console.log(body);
  //     });
  // });
});
