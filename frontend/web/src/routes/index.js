import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SingUp';

import Dashborad from '../pages/Dashboard';
import HelpOrder from '../pages/HelpOrder/list';
import PlanList from '../pages/Plan/list';
import PlanFormCreate from '../pages/Plan/form';
import Registration from '../pages/Registration/list';
import StudentList from '../pages/Student/list';
import StudentFormCreate from '../pages/Student/form';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />

      <Route path="/dashboard" component={Dashborad} isPrivate />
      <Route path="/helpOrders" component={HelpOrder} isPrivate />
      <Route path="/plans" component={PlanList} isPrivate />
      <Route path="/plan/create" component={PlanFormCreate} isPrivate />
      <Route path="/registrations" component={Registration} isPrivate />
      <Route path="/students" component={StudentList} isPrivate />
      <Route path="/student/create" component={StudentFormCreate} isPrivate />
    </Switch>
  );
}
