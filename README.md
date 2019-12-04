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
  <a href="#-entrega">Entrega</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-licença">Licença</a>
</p>

## :rocket: Como Executar

- Para executar

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
