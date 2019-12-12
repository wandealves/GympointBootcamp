import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  width: 100%;
  padding: 30px 80px 0px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  h2 {
    font-size: 24px;
    color: #444444;
    text-align: left;
  }

  div {
    display: flex;

    button {
      color: #fff;
      text-transform: uppercase;
      font-weight: bold;
      border: 0;
      border-radius: 4px;
      height: 36px;
      padding: 0 15px;
      transition: background 0.2s;

      display: flex;
      align-items: center;

      &.btn-back {
        background: #ccc;
        margin-right: 10px;

        &:hover {
          background: ${darken(0.1, '#ccc')};
        }
      }

      &.btn-save {
        background: #ee4d64;

        &:hover {
          background: ${darken(0.1, '#ee4d64')};
        }
      }
    }
  }
`;

export const Content = styled.div`
  margin-top: 20px;
  background: #fff;
  padding: 20px;
  border-radius: 4px;

  form {
    display: flex;
    flex-direction: column;

    label {
      text-transform: uppercase;
      font-weight: bold;
      margin-bottom: 5px;
      font-size: 14px;
      color: #444444;
      text-align: left;
    }

    input {
      background: transparent;
      border: 1px solid #ddd;
      height: 44px;
      padding: 0 15px;
      border-radius: 4px;
      margin-bottom: 15px;
      font-size: 16px;
      color: #999999;
      text-align: left;

      & + span {
        color: #ee0000;
        align-self: flex-start;
        margin: 0 0 10px;
        font-weight: bold;
        font-size: 12px;
      }
    }

    input.fieldDisable {
      background: #eee9e9;
    }

    div {
      display: flex;
      justify-content: space-between;

      div {
        display: flex;
        flex-direction: column;
        width: 100%;
        margin-right: 20px;

        &:last-of-type {
          margin-right: 0;
        }
      }
    }
  }
`;
