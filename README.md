<h1 align="center">
  Gympoint
</h1>

<h3 align="center">
  Desafio : Gympoint
</h3>

<blockquote align="center">“Não espere para plantar, apenas tenha paciência para colher”!</blockquote>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/rocketseat/bootcamp-gostack-desafio-02?color=%2304D361">

  <a href="https://rocketseat.com.br">
    <img alt="Made by Rocketseat" src="https://img.shields.io/badge/made%20by-Rocketseat-%2304D361">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-%2304D361">

  <a href="https://github.com/Rocketseat/bootcamp-gostack-desafio-02/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/rocketseat/bootcamp-gostack-desafio-02?style=social">
  </a>
</p>

<p align="center">
  <a href="#rocket-como-executar">Executar</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="#rocket-api">API</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
</p>

## :rocket: Como Executar

- Backend

a) Rodar as migration:

yarn sequelize db:migrate

b) Rodar Seed:

yarn sequelize db:seed:all

c) Executar backend:

yarn dev

- Frontend

a) Executar aplicação web:

yarn start

- Mobile

Foi desenvolvido para Android

a) react-native start --reset-cache
b) react-native run-android

## :rocket: Mobile

![login_mobile](https://user-images.githubusercontent.com/3501534/70911395-9889c800-1ff0-11ea-922f-1f74ae26e6e0.png)

![orderHelp_mobile](https://user-images.githubusercontent.com/3501534/70911397-9889c800-1ff0-11ea-86f7-3c39ce482bb9.png)


![checkin_mobile](https://user-images.githubusercontent.com/3501534/70911398-99225e80-1ff0-11ea-8ba8-f0fa6ad0028e.png)

## :rocket: API

#### 1. User

- POST http://[base_url]/users

Body:

```json
{
  "name": "name_user",
  "email": "user@email.com",
  "password": "123456"
}
```

- PUT http://[base_url]/users

Body:

```json
{
  "name": "user_name",
  "email": "user@email.com",
  "oldPassword": "123456",
  "password": "222222",
  "confirmPassword": "222222"
}
```

#### 2. Token

- POST http://[base_url]/sessions

Body:

```json
{
  "email": "admin@gympoint.com",
  "password": "123456"
}
```

#### 3. Students

- POST http://[base_url]/students

```json
{
  "name": "user_name",
  "email": "user@email.com",
  "age": 36,
  "weight": 80.2,
  "height": 1.8
}
```

- PUT http://[base_url]/students/{id}

```json
{
  "name": "user_name",
  "email": "user@email.com",
  "age": 36,
  "weight": 80.2,
  "height": 1.8
}
```

#### 4. Plans

- GET http://[base_url]/plans

- POST http://[base_url]/plans

```json
{
  "title": "plan",
  "duration": 1,
  "price": 1
}
```

- PUT http://[base_url]/plans/{id}

```json
{
  "title": "plan",
  "duration": 1,
  "price": 1
}
```

- DELETE http://[base_url]/plans/{id}

#### 5. Registrations

- GET http://[base_url]/registrations?page=1

- POST http://[base_url]/registrations

```json
{
  "student_id": 1,
  "plan_id": 1,
  "start_date": "2019-01-06T11:00:00-03:00"
}
```

- PUT http://[base_url]/registrations/{id}

```json
{
  "start_date": "2019-10-06T11:00:00-03:00",
  "plan_id": 1
}
```

- DELETE http://[base_url]/registrations/{id}

#### 6. Checkins

- POST http://[base_url]/students/{id}/checkins

- GET http://[base_url]/students/{id}/checkins?page=1

#### 7. Help Orders

- Lista de pedidos sem respostas

- GET http://[base_url]/help-orders/no-reply?page=1

- Cadastrar e listar pedidos

- POST http://[base_url]/students/{id}/help-orders

```json
{
  "question": "question"
}
```

- GET http://[base_url]/students/{id}/help-orders?page=1

- Responder pedido

- POST http://[base_url]/help-orders/{id}/answer

```json
{
  "answer": "answer",
  "answer_at": "2019-12-04T11:00:00-03:00"
}
```
