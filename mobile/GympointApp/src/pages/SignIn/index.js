import React, {useState} from 'react';
import {Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import logo from '~/assets/logo.png';
import {signInRequest} from '~/store/modules/auth/actions';
import { Container, Form, FormInput, SubmitButton } from './styles';

export default function SignIn() {
  const dispach = useDispatch();
  const [idUser, setIdUser] = useState('');
  const loading = useSelector(state => state.auth.loading);

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

        <SubmitButton loading={loading} onPress={handleSubmit}>
          Entrar no sistema
        </SubmitButton>
      </Form>
    </Container>
  );
}
