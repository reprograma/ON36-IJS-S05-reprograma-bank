<h1 align="center">
  <img src="assets/reprograma-fundos-claros.png" alt="logo reprograma" width="500">
</h1>

# Banco de dados

Turma Online ON36 - Imersão JavaScript | Semana 5 | 2024 | Professora Lais Frigério

## Professora Lais

<h1>
  <img src="./assets/lais.png" alt="foto lais" width="200">
</h1>

Eu sou engenheira de software, professora de programação e compartilho conteúdo técnico em minhas redes sociais!

Fui aluna da segunda turma do curso Eudca{devas} em 2023!
Hoje trabalho como Engenheira de Software no Nubank.

- 💌 Email: laisfrigerio.dev@gmail.com
- 📸 Instagram: [@laisfrigerio](https://www.instagram.com/laisfrigerio/)
- 💼 LinkedIn: [in/laisfrigerio](https://www.linkedin.com/in/laisfrigerio/)
- 👩‍💻 Github:[/laisfrigerio](https://github.com/laisfrigerio)

## Sistema

Este projeto consiste em uma API para simular um banco, com clientes e suas contas, além de toda a gerenciamento feito pelos gerentes.

O cliente possui os seguintes dados:

- Nome
- Endereço
- Telefone
- Contas

> Obs: Um cliente pode ter mais de uma conta.

Nosso banco possui 2 tipos de Conta:

- Conta Corrente
- Conta Poupança

Segue os requisitos de negócio:

- Cada cliente pode ter uma ou mais contas bancárias. As contas podem ser do tipo Conta Corrente ou Conta Poupança.
- Para a conta corrente, é necessário armazenar o limite do cheque especial.
- Para a conta poupança, é necessário armazenar a taxa de juros.
- As Contas podem fazer depósito, tranferencia e saque

Atualmente, essa API contém as seguintes rotas para clientes:

- GET http://localhost:3000/clients
- GET http://localhost:3000/clients/:clientId
- POST http://localhost:3000/clients

Também contém as seguintes rotas para cadastro de gerentes:

- GET http://localhost:3000/managers
- GET http://localhost:3000/managers/:id
- POST http://localhost:3000/managers
- DELETE http://localhost:3000/users/:id

E também possuim as seguintes rotas para um gerente gerenciar as contas dos seus respectivos clientes:

- GET http://localhost:3000/managers/:managerId/clients (Lista de seus clientes)
- POST http://localhost:3000/managers/:managerId/clients (Adicionar novo cliente)
- DELETE http://localhost:3000/managers/:managerId/clients/:clientId (Remover cliente)
- POST http://localhost:3000/managers/:managerId/clients/:clientId/accounts (Adicionar conta à um cliente)
- DELETE http://localhost:3000/managers/:managerId/accounts/:accountId (Remove conta de um cliente)
- POST http://localhost:3000/managers/:managerId/accounts/:accountId/change-type (Mudar tipo da conta)

### Tecnologias

Este projeto foi construído com as seguintes tecnologias:

- NestJs
- TypeScript
- Jest / Supertest

## Executar o projeto

- Instalação das dependências:

```sh
npm install
```

- Execução:

```sh
npm run start:dev
```

> Esse comando executa a aplicação com nodemon. A cada atualização, a aplicação é buildada automaticamente!

### Acessando rota via CURL

- GET lista de clients:

```sh
curl -X GET 'http://localhost:3000/clients'
```

- GET client pelo seu ID (uuid):

```sh
curl -X GET 'http://localhost:3000/clients/:clientId'
```

- POST cadastrando um gerente:

```sh
curl -X POST 'http://localhost:3000/managers' -H 'Content-Type: application/json' --data '{
  "name": "Maria Joana"
  }'
```

- GET listando todos os gerentes:

```sh
curl -X GET 'http://localhost:3000/managers'
```

- GET pegando dados de um gerente pelo seu ID:

```sh
curl -X GET 'http://localhost:3000/managers/:managerId'
```

- DELETE removendo um gerente pelo seu ID:

```sh
curl -X DELETE 'http://localhost:3000/managers/:managerId'
```

<p align="center">
Desenvolvido com :purple_heart: por laisfrigerio
</p>
