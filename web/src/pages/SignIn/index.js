import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';

import logo from '~/assets/logo.png';

export default function SignIn() {
  function handleSubmit(data) {
    console.tron.log(data);
  }

  return (
    <>
      <div>
        <img src={logo} alt="Gympoint" />

        <Form onSubmit={handleSubmit}>
          <span htmlFor="email">SEU E-MAIL</span>
          <Input
            name="email"
            id="email"
            type="email"
            placeholder="example@email.com"
          />
          <span htmlFor="password">SUA SENHA</span>
          <Input
            name="password"
            id="password"
            type="password"
            placeholder="**************"
          />

          <button type="submit">Entrar no sistema</button>
          <Link to="/register">Criar conta</Link>
        </Form>
      </div>
    </>
  );
}
