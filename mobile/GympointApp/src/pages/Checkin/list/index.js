import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import Toast from 'react-native-simple-toast';

import api from '~/services/api';
import Background from '~/components/Background';
import CheckRow from '../row';
import {Container, SubmitButton, List} from './styles';

export default function CheckIn() {
  const [checks, setChecks] = useState();
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [more, setMore] = useState(true);
  const per_page = 10;

  const {id} = useSelector(state => state.auth.student);

  async function loadCheckIn() {
    if (more) {
      const response = await api.get(`students/${id}/checkins`, {
        params: {page, per_page},
      });
      if (response.data.length === 0) {
        setMore(false);
      } else {
        const newChecks = checks
          ? [...checks, ...response.data]
          : response.data;

        setChecks(newChecks);
        setPage(page + 1);
      }
    }
  }

  useEffect(() => {
    loadCheckIn();
  }, []); // eslint-disable-line

  async function handleRefreshing() {
    setRefreshing(true);
    const response = await api.get(`students/${id}/checkins`, {
      params: {page: 1, per_page},
    });
    setChecks(response.data);
    setPage(2);
    setMore(true);
    setRefreshing(false);
  }

  async function handleCheckIn() {
    try {
      await api.post(`students/${id}/checkins`);
      handleRefreshing();
    } catch (err) {
      Toast.show(err.response.data.error, Toast.LONG);
    }
  }

  return (
    <Background>
      <Container>
        <SubmitButton onPress={handleCheckIn}>Novo check-in</SubmitButton>
        <List
          data={checks}
          keyExtractor={item => String(item.id)}
          onRefresh={handleRefreshing}
          onEndReacherdThreshold={0.2}
          onEndReached={loadCheckIn}
          refreshing={refreshing}
          renderItem={({item}) => <CheckRow data={item} />}
        />
      </Container>
    </Background>
  );
}

CheckIn.navigationOptions = {
  title: 'Gympoint',
  headerTitleStyle: {
    textAlign: 'center',
    flexGrow:1,
    alignSelf:'center',
    fontWeight: 'bold',
  },
};
