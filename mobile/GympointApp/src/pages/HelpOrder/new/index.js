import React, {useState, useMemo} from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-simple-toast';

import api from '~/services/api';
import Background from '~/components/Background';

import {Container, InputMult, LengthInput, SubmitButton} from './styles';

export default function HelpOrderNew({navigation}) {
  const [question, setQuestion] = useState('');
  const {id} = useSelector(state => state.auth.student);

  const questionLength = useMemo(() => {
    return 255 - question.length;
  }, [question.length]);

  async function handleSubmit() {
    try {
      await api.post(`students/${id}/help-orders`, {
        question,
      });
      navigation.navigate('HelpOrderList');
    } catch (err) {
      Toast.show(err.response.data.error, Toast.LONG);
    }
  }

  return (
    <Background>
      <Container>
        <LengthInput limit={questionLength < 0}>
          {questionLength}/255
        </LengthInput>
        <InputMult
          placeholder="Inclua seu pedido de auxílio"
          style={{textAlignVertical: 'top'}}
          onChangeText={setQuestion}
        />

        <SubmitButton onPress={handleSubmit}>Enviar pedido</SubmitButton>
      </Container>
    </Background>
  );
}

HelpOrderNew.navigationOptions = ({navigation}) =>({
  title: 'Gympoint',
  headerLeft: () =>(
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('HelpOrderList');
      }}>
      <Icon name="chevron-left" size={24} color="#ee4e62" />
    </TouchableOpacity>
  ),
});

HelpOrderNew.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
