import React from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';

import logo from '~/assets/logo.png';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

export default function SignIn() {
  function handleSubmit(data) {
    console.tron.log(data);
  }

  return (
    <>
      <div>
        <img src={logo} alt="Gympoint" />

        <Form schema={schema} onSubmit={handleSubmit}>
          <label htmlFor="email">SEU E-MAIL</label>
          <Input
            name="email"
            id="email"
            type="email"
            placeholder="example@email.com"
          />
          <label htmlFor="password">SUA SENHA</label>
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
