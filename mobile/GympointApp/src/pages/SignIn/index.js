import React, {useState} from 'react';
import {Image} from 'react-native';
import {useDispatch} from 'react-redux';

import logo from '~/assets/logo.png';
import {signInRequest} from '~/store/modules/auth/actions';
import { Container, Form, FormInput, SubmitButton } from './styles';

export default function SignIn() {
  const dispach = useDispatch();
  const [idUser, setIdUser] = useState('');

  function handleSubmit(){
    dispach(signInRequest(idUser));
  }

  return(
    <Container>
      <Image source={logo}/>
      <Form>
        <FormInput
          keyboardType="number-pad"
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Informe seu ID de cadastro"
          returnkeyType="send"
          onSubmitEditing={handleSubmit}
          value={idUser}
          onChangeText={setIdUser}
        />

        <SubmitButton onPress={handleSubmit}>
          Entrar no sistema
        </SubmitButton>
      </Form>
    </Container>
  );
}
