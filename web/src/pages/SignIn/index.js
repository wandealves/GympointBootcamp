import React from 'react';
import { Link } from 'react-router-dom';

import logo from '~/assets/logo.png';

export default function SignIn() {
  return (
    <>
      <div className="container">
        <img src={logo} alt="Gympoint" />

        <form>
          <input type="email" placeholder="Seu e-mail" />
          <input type="password" placeholder="Sua senha" />

          <button type="submit">Entrar no sistema</button>
          <Link to="/register">Criar conta</Link>
        </form>
      </div>
    </>
  );
}
