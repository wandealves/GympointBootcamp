import {Platform} from 'react-native';
import styled from 'styled-components/native';

import Input from '~/components/Input';
import Button from '~/components/Button';

export const Container = styled.View`
  flex:1;
  justify-content: center;
  align-items:center;
  padding: 0 30px;
`;

export const Form = styled.View`
align-self: stretch;
margin-top: 50px;
`;

export const FormInput = styled(Input)`
margin-bottom: 10px;
background: #FFF;
border: 1px solid #ddd;
font-size:16px;
color:#999999 !important;
`;

export const SubmitButton = styled(Button)`
margin-top: 5px;
font-size:16px;
color:red !important;
text-align:left;
background:#ee4d64;
`;
