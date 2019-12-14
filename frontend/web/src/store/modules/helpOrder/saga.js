import { takeLatest, call, all, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { updateRequestSuccess, failure } from './actions';
import api from '~/services/api';
import history from '~/services/history';

/* export function* addPlan({ payload }) {
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
} */

export function* updateHelpOrder({ payload }) {
  try {
    const { data } = payload;
    const response = yield call(api.post, `/help-orders/${data.id}/answer`, {
      ...data,
    });

    yield put(updateRequestSuccess(response.data));
    toast.success('Resposta enviada com sucesso');
    history.push('/helpOrders');
  } catch (error) {
    yield put(failure());
    toast.error(error.response.data.error);
  }
}

export default all([takeLatest('@help_order/UPDATE_REQUEST', updateHelpOrder)]);
