import { takeLatest, call, put, all } from 'redux-saga/effects';
import Toast from 'react-native-simple-toast';

import api from '~/services/api';
import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { id } = payload;
    const response = yield call(api.post, 'students-auth', {
      id,
    });

    yield put(signInSuccess(response.data));
  } catch (err) {
    Toast.show('Falha na autenticação, verifique seus dados.', Toast.LONG);
    yield put(signFailure());
  }
}

export function signOut() {
  history.push('/');
}

export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
