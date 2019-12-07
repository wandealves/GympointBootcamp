import React from 'react';
import { Link } from 'react-router-dom';

import logo from '~/assets/logo.png';

export default function SignIn() {
  return (
    <>
      <div>
        <img src={logo} alt="Gympoint" />

        <form>
          <span htmlFor="email">SEU E-MAIL</span>
          <input id="email" type="email" placeholder="example@email.com" />
          <span htmlFor="password">SUA SENHA</span>
          <input id="password" type="password" placeholder="**************" />

          <button type="submit">Entrar no sistema</button>
          <Link to="/register">Criar conta</Link>
        </form>
      </div>
    </>
  );
}
