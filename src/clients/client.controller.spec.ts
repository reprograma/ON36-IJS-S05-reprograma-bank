import * as supertest from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../app.module';

describe('Client Controller', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  test('should create a client', () => {
    const name = 'John Doe';
    const address = '123 Main St';
    const phoneNumber = '555-555-5555';

    return supertest(app.getHttpServer())
      .post('/clients')
      .send({
        name,
        address,
        phoneNumber,
      })
      .expect(201)
      .expect(({ body }) => {
        expect(body.name).toBe('John Doe');
        expect(body.address).toBe(address);
        expect(body.phoneNumber).toBe(phoneNumber);
      });
  });

  test('should create a client', async () => {
    const name = 'John Doe';
    const address = '123 Main St';
    const phoneNumber = '555-555-5555';
    await supertest(app.getHttpServer()).post('/clients').send({
      name,
      address,
      phoneNumber,
    });

    return supertest(app.getHttpServer())
      .get('/clients')
      .expect(200)
      .expect(({ body }) => {
        console.log(body);
      });
  });
});
