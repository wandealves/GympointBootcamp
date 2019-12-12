import styled from 'styled-components';
import { Form } from '@rocketseat/unform';
import { darken } from 'polished';
import MyAsyncSelect from '~/components/SearchSelectAsync';
import MySelect from '~/components/SearchSelect';

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

export const Content =  styled.div`
  margin-top: 20px;
  width: 100%;
  font-size: 16px;
  background: #fff;
  padding: 30px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  label {
    font-size: 14px;
    line-height: 16px;
    font-weight: bold;
  }
  input.normal-input {
    height: 36px;
    border: 1px solid #dddddd;
    border-radius: 4px;
    margin-top: 8px;
    padding: 20px;
  }
  div + span {
    color: '#ee4d64';
  align-self: 'flex-start';
  margin: '0 0 10px';
  font-weight: 'bold';
  margin-top: '3px';
  }

  label {
      text-transform: uppercase;
      font-weight: bold;
      margin-bottom: 5px;
      font-size: 14px;
      color: #444444;
      text-align: left;
    }
`;

export const ContentRow = styled.div`
  margin-top: 20px;
  display: flex;
  & > div {
    display: flex;
    flex: 1;
    flex-direction: column;
    margin-right: 15px;
    &:last-child {
      margin-right: 0;
    }
  }
`;

export const StudentPicker = styled(MyAsyncSelect)`
  margin-top: 8px;
  .react-asyncselect__control {
    border: 1px solid #dddddd;
    .react-asyncselect__value-container {
      height: 40px;
      input {
        /* height: auto; */
      }
    }
  }
`;

export const PlanPicker = styled(MySelect)`
  margin-top: 8px;
  .react-select__control {
    border: 1px solid #dddddd;
    .react-select__value-container {
      height: 40px;
    }
  }
`;
