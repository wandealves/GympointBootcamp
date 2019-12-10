import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { signOut } from '~/store/modules/auth/actions';
import logo from '~/assets/logo_header.png';
import { Container, Left, Logo, Navigation, Right } from './styles';

export default function Header() {
  const profile = useSelector(state => state.user.profile);

  function handleSignOut() {
    // dispatch(signOut());
  }

  return (
    <Container>
      <Left>
        <Logo>
          <img src={logo} height={23} width={45} alt="Gympoint Logo" />
          <h4>Gympoint</h4>
        </Logo>
        <Navigation>
          <li>
            <Link to="/students">Alunos</Link>
          </li>
          <li>
            <Link to="/plans">Planos</Link>
          </li>
          <li>
            <Link to="/registrations">Matrículas</Link>
          </li>
          <li>
            <Link to="/helpOrders">Pedidos de Auxílio</Link>
          </li>
        </Navigation>
      </Left>
      <Right>
        <strong>{profile.name}</strong>
        <button type="button" onClick={handleSignOut}>
          sair do sistema
        </button>
      </Right>
    </Container>
  );
}
