import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {withNavigationFocus} from 'react-navigation';

import Background from '~/components/Background';
import api from '~/services/api';
import HelpOrderRow from '../row';

import {Container, SubmitButton, List} from './styles';

function HelpOrderList({navigation, isFocused}) {
  const [orders, setOrders] = useState();
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [more, setMore] = useState(true);
  const {id} = useSelector(state => state.auth.student);
  const per_page = 5;

  async function loadMoreOrders() {
    if (more) {
      const response = await api.get(`students/${id}/help-orders`, {
        params: {page, per_page},
      });
      if (response.data.length === 0) {
        setMore(false);
      } else {
        const newOrder = orders ? [...orders, ...response.data] : response.data;

        setOrders(newOrder);
        setPage(page + 1);
      }
    }
  }

  async function loadOrders() {
    const response = await api.get(`students/${id}/help-orders`, {
      params: {page: 1, per_page},
    });
    setOrders(response.data);
    setPage(2);
    setMore(true);
  }

  useEffect(() => {
    if (isFocused) {
      loadOrders();
    }
  }, [isFocused]); // eslint-disable-line

  async function handleRefreshing() {
    setRefreshing(true);
    loadOrders();
    setRefreshing(false);
  }

  return (
    <Background>
      <Container>
        <SubmitButton onPress={() => navigation.navigate('HelpOrderNew')}>
          Novo pedido de auxílio
        </SubmitButton>
        <List
          data={orders}
          keyExtractor={item => String(item.id)}
          onRefresh={handleRefreshing}
          onEndReacherdThreshold={0.2}
          onEndReached={loadMoreOrders}
          refreshing={refreshing}
          renderItem={({item}) => (
            <HelpOrderRow data={item} navigation={navigation} />
          )}
        />
      </Container>
    </Background>
  );
}

HelpOrderList.navigationOptions = {
  title: 'Gympoint',
  headerTitleStyle: {
    textAlign: 'center',
    flexGrow:1,
    alignSelf:'center',
    fontWeight: 'bold',
  },
};

HelpOrderList.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  isFocused: PropTypes.bool.isRequired,
};

export default withNavigationFocus(HelpOrderList);
