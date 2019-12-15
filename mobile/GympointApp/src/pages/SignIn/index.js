import React from 'react';
import {Image} from 'react-native';

import logo from '~/assets/logo.png';
import { Container, Form, FormInput, SubmitButton } from './styles';

export default function SignIn() {

  function handleSubmit(){}

  return(
    <Container>
      <Image source={logo}/>
      <Form>
        <FormInput
          keyboardType="email-address"
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Informe seu ID de cadastro"
          returnkeyType="send"
          onSubmitEditing={handleSubmit}
        />

        <SubmitButton onPress={handleSubmit}>
          Entrar no sistema
        </SubmitButton>
      </Form>
    </Container>
  );
}
