import React from 'react';
import { Link } from 'react-router-dom';

import logo from '~/assets/logo.png';

export default function SignUp() {
  return (
    <>
      <div className="container">
        <img src={logo} alt="Gympoint" />

        <form>
          <input placeholder="Nome Completo" />
          <input type="email" placeholder="Seu e-mail" />
          <input type="password" placeholder="Sua senha" />

          <button type="submit">Criar Conta</button>
          <Link to="/">Já tenho login</Link>
        </form>
      </div>
    </>
  );
}
