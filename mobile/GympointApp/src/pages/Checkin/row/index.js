import React, {useMemo} from 'react';
import {parseISO, formatRelative} from 'date-fns';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';

import {Container, TextRow, TimeRow} from './styles';

export default function CheckInRow({data}) {
  const dateParsed = useMemo(() => {
    return formatRelative(parseISO(data.createdAt), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [data.createdAt]);

  return (
    <Container>
      <TextRow>Check-in #{data.id}</TextRow>
      <TimeRow>{dateParsed}</TimeRow>
    </Container>
  );
}

CheckInRow.propTypes = {
  data: PropTypes.shape().isRequired,
};
