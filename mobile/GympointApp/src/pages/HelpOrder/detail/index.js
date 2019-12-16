import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity} from 'react-native';
import {parseISO, formatRelative} from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';

import {Container, Row, RowText, RowTime, Content, Text} from './styles';

export default function HelpOrderDetail({navigation}) {
  const data = navigation.getParam('data');

  const dateParsed = useMemo(() => {
    return formatRelative(parseISO(data.createdAt), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [data.createdAt]);

  const dateAnswerParsed = useMemo(() => {
    if (!data.answer_at) {
      return '';
    }
    return formatRelative(parseISO(data.answer_at), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [data.answer_at]);

  return (
    <Background>
      <Container>
        <Row>
          <RowText>Pergunta: </RowText>
          <RowTime>{dateParsed}</RowTime>
        </Row>
        <Content>
          <Text>{data.question}</Text>
        </Content>
        <Row>
          <RowText>Resposta:</RowText>
          <RowTime>{dateAnswerParsed}</RowTime>
        </Row>
        <Content>
          <Text>{data.answer}</Text>
        </Content>
      </Container>
    </Background>
  );
}

HelpOrderDetail.navigationOptions = {
  title: 'Gympoint',
  headerTitleStyle: {
    textAlign: 'center',
    flexGrow:1,
    alignSelf:'center',
    fontWeight: 'bold',
  },
};

HelpOrderDetail.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    getParam: PropTypes.func,
  }).isRequired,
};
