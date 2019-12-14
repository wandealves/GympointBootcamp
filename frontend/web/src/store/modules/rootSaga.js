import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import user from './user/saga';
import student from './student/saga';
import plan from './plan/saga';
import registration from './registration/saga';
import helpOrder from './helpOrder/saga';

export default function* rootSaga() {
  return yield all([auth, user, student, plan, registration, helpOrder]);
}
