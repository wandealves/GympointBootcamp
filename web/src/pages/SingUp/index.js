import React from 'react';
import { Link } from 'react-router-dom';

import { Form, Input } from '@rocketseat/unform';
import logo from '~/assets/logo.png';

export default function SignUp() {
  function handleSubmit(data) {
    console.tron.log(data);
  }

  return (
    <>
      <div className="container">
        <img src={logo} alt="Gympoint" />

        <Form onSubmit={handleSubmit}>
          <Input name="name" placeholder="Nome Completo" />
          <Input name="email" type="email" placeholder="Seu e-mail" />
          <Input name="password" type="password" placeholder="Sua senha" />

          <button type="submit">Criar Conta</button>
          <Link to="/">Já tenho login</Link>
        </Form>
      </div>
    </>
  );
}
