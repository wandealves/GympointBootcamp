import { takeLatest, call, all, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { addRequestSuccess, updateRequestSuccess, failure } from './actions';
import api from '~/services/api';
import history from '~/services/history';

export function* addStudent({ payload }) {
  try {
    const { data } = payload;

    const response = yield call(api.post, 'students', {
      ...data,
    });

    toast.success('Aluno cadastrado com sucesso!');
    yield put(addRequestSuccess(response.data));
  } catch (error) {
    yield put(failure());
    toast.error('Falha na cadastro de aluno, verifique seus dados.');
  }
}

export function* updateStudent({ payload }) {
  try {
    const { data, id } = payload;

    const response = yield call(api.put, `/students/${id}`, {
      ...data,
    });

    yield put(updateRequestSuccess(response.data));
    toast.success('Aluno atualizado com sucesso');
    history.push('/students');
  } catch (error) {
    yield put(failure());
    toast.error(error.response.data.error);
  }
}

export default all([
  takeLatest('@student/ADD_REQUEST', addStudent),
  takeLatest('@student/UPDATE_REQUEST', updateStudent),
]);
