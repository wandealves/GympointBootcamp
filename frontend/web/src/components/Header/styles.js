import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  height: 64px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  padding: 5px 30px;
  box-shadow: 0px 1px 2px #ddd;
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  padding-right: 20px;
  margin-right: 20px;
  border-right: 1px solid #ddd;

  h4 {
    text-transform: uppercase;
    margin-left: 10px;
    color: #ee4d64;
  }
`;

export const Navigation = styled.ul`
  display: flex;

  li {
    margin-right: 25px;

    a {
      text-transform: uppercase;
      color: #999;
      font-weight: bold;
      transition: color 0.2s;
      font-size: 15px;
      text-align: left;

      &.active {
        color: #444444;
      }

      &:hover {
        color: ${darken(0.08, '#444444')};
      }
    }
  }
`;

export const Right = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;

  strong {
    font-size: 14px;
    color: #666666;
    text-align: left;
  }

  button {
    font-size: 14px;
    color: #de3b3b;
    text-align: right;
    margin-top: 5px;
    background: transparent;
    border: 0;
    transition: color 0.1s;

    &:hover {
      color: red;
    }
  }
`;
