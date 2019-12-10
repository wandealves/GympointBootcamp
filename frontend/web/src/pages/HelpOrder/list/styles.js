import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
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
      color: #ffffff;
      text-transform: uppercase;
      font-weight: bold;
      background: #ee4d64;
      border: 0;
      border-radius: 4px;
      height: 36px;
      padding: 0 15px;
      text-align: center;
      font-size: 14px;

      display: flex;
      align-items: center;

      &:hover {
        background: ${darken(0.1, '#ee4d64')};
      }
    }
  }
`;

export const Content = styled.div`
  margin-top: 20px;
  background: #fff;
  padding: 20px 20px 0;
  border-radius: 4px;

  table {
    width: 100%;
    border-collapse: collapse;

    th {
      text-transform: uppercase;
      font-size: 16px;
      color: #444444;
      text-align: left;
    }

    th.th-none {
      display: none;
    }

    tr:not(:last-of-type) {
      border-bottom: 1px solid #eee;
    }

    tr {
      td {
        width: 22%;
        padding: 15px 0;
        font-size: 16px;
        color: #666666;
        text-align: left;
        line-height: 20px;

        button.btn {
          border: 0;
          background: transparent;
          transition: color 0.1s;
          font-size: 15px;
          text-align: right;

          &.btn-edit {
            margin-right: 15px;
            color: #4d85ee;

            &:hover {
              color: ${darken(0.2, '#4d85ee')};
            }
          }

          &.btn-delete {
            color: #de3b3b;

            &:hover {
              color: red;
            }
          }
        }

        &.actions {
          width: 18%;
          text-align: right;
        }
      }
    }
  }
`;

export const EmptyContent = styled.div`
  margin-top: 20px;
  border-radius: 4px;
  background: #fff;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #444;
  font-size: 16px;
`;
