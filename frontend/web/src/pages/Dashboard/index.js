import React from 'react';

import logo from '~/assets/logo_header.png';
import { Container, Logo } from './styles';

export default function Dashboard() {
  return (
    <Container>
      <header>
        <Logo>
          <img src={logo} height={23} width={45} alt="Gympoint" />
          <h4>Gympoint</h4>
        </Logo>
        <strong>Gerenciador de Academia</strong>
      </header>
    </Container>
  );
}
