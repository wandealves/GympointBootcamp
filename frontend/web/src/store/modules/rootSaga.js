import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import user from './user/saga';
import student from './student/saga';

export default function* rootSaga() {
  return yield all([auth, user, student]);
}
