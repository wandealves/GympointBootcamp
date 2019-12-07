import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  background: #ee4d64;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 300px;
  background: #fff;
  border-radius: 4px;
  padding: 30px;
  margin: 80px;

  img {
    display: block;
    margin-left: auto;
    margin-right: auto;
    max-width: 120px;
    margin-top: 20px;
    margin-bottom: 20px;
    max-height: 150px;
    width: auto;
    height: auto;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    label {
      color: #444444;
      text-align: left;
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 5px;
    }

    input {
      background: #fff;
      border: 1px solid #ccc;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #999999;
      margin: 0 0 10px;

      &::placeholder {
        font-size: 16px;
        color: #999999;
        text-align: left;
      }
    }

    span {
      color: #fb6f91;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
      font-size: 12px;
    }

    button {
      margin: 5px 0 0;
      height: 44px;
      background: #ee4d64;
      font-weight: bold;
      color: #ffffff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#ee4d64')};
      }
    }

    a {
      color: #ee4d64;
      margin-top: 15px;
      font-size: 16px;
      opacity: 0.8;
      text-align: center;

      &:hover {
        opacity: 1;
      }
    }
  }
`;
