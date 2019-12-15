import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {parseISO, formatRelative} from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  TitleRow,
  AnswerRow,
  AnswerText,
  TimeRow,
  Content,
  TextRow,
} from './styles';

export default function HelpOrderRow({data, navigation}) {
  const dateParsed = useMemo(() => {
    return formatRelative(parseISO(data.createdAt), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [data.createdAt]);

  const answered = !!data.answer;

  function handleSelectOrder() {
    navigation.navigate('HelpOrderDetail', {data});
  }

  return (
    <Container onPress={handleSelectOrder}>
      <TitleRow>
        <AnswerRow>
          <Icon
            name="check-circle"
            size={16}
            color={answered ? '#42CB59' : '#999999'}
          />
          <AnswerText answered={answered}>
            {answered ? 'Respondido' : 'Sem resposta'}
          </AnswerText>
        </AnswerRow>
        <TimeRow>{dateParsed}</TimeRow>
      </TitleRow>
      <Content>
        <TextRow>{data.question}</TextRow>
      </Content>
    </Container>
  );
}

HelpOrderRow.propTypes = {
  data: PropTypes.shape().isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    getParam: PropTypes.func,
  }).isRequired,
};
