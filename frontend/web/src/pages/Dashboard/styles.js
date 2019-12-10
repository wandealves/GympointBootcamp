import styled from 'styled-components';

export const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;

  display: flex;

  flex-direction: column;

  header {
    display: flex;
    align-self: center;
    align-items: center;

    strong {
      color: #ee4d64;
      font-size: 24px;
      font-weight: bold;
      margin: 0 15px;
    }
  }
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
