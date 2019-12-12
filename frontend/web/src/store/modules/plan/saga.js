import { takeLatest, call, all, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { addRequestSuccess, updateRequestSuccess, failure } from './actions';
import api from '~/services/api';
import history from '~/services/history';

export function* addPlan({ payload }) {
  try {
    const { data } = payload;

    const response = yield call(api.post, 'plans', {
      ...data,
    });

    toast.success('Plano cadastrado com sucesso!');
    yield put(addRequestSuccess(response.data));
  } catch (error) {
    yield put(failure());
    toast.error('Falha na cadastro de plano, verifique seus dados.');
  }
}

export function* updatePlan({ payload }) {
  try {
    const { data, id } = payload;

    const response = yield call(api.put, `/plans/${id}`, {
      ...data,
    });

    yield put(updateRequestSuccess(response.data));
    toast.success('Plano atualizado com sucesso');
    history.push('/plans');
  } catch (error) {
    yield put(failure());
    toast.error(error.response.data.error);
  }
}

export default all([
  takeLatest('@plan/ADD_REQUEST', addPlan),
  takeLatest('@plan/UPDATE_REQUEST', updatePlan),
]);
