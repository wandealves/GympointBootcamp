import { takeLatest, call, put, all } from 'redux-saga/effects';
import {Alert} from 'react-native';

//import history from '~/services/history';
import api from '~/services/api';
import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { id } = payload;
    const response = yield call(api.post, 'students-auth', {
      id,
    });

    yield put(signInSuccess(response.data));

    //history.push('/dashboard');
  } catch (err) {
    Alert.alert('Erro no login', 'Falha na autenticação, verifique seus dados.');
    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
