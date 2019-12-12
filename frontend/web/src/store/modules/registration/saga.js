import { takeLatest, call, all, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { addRequestSuccess, updateRequestSuccess, failure } from './actions';
import api from '~/services/api';
import history from '~/services/history';

export function* addRegistrion({ payload }) {
  try {
    const { data } = payload;

    const response = yield call(api.post, 'registrions', {
      ...data,
    });

    toast.success('Matricula cadastrado com sucesso!');
    yield put(addRequestSuccess(response.data));
  } catch (error) {
    yield put(failure());
    toast.error('Falha na cadastro de matricula, verifique seus dados.');
  }
}

export function* updateRegistrion({ payload }) {
  try {
    const { data, id } = payload;

    const response = yield call(api.put, `/registrions/${id}`, {
      ...data,
    });

    yield put(updateRequestSuccess(response.data));
    toast.success('Matricula atualizado com sucesso');
    history.push('/registrions');
  } catch (error) {
    yield put(failure());
    toast.error(error.response.data.error);
  }
}

export default all([
  takeLatest('@registrion/ADD_REQUEST', addRegistrion),
  takeLatest('@registrion/UPDATE_REQUEST', updateRegistrion),
]);
