import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SingUp';

import Dashborad from '../pages/Dashboard';
import HelpOrder from '../pages/HelpOrder/list';
import PlanList from '../pages/Plan/list';
import PlanForm from '../pages/Plan/form';
import RegistrationList from '../pages/Registration/list';
import RegistrationForm from '../pages/Registration/form';
import StudentList from '../pages/Student/list';
import StudentForm from '../pages/Student/form';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />
      <Route path="/dashboard" component={Dashborad} isPrivate />
      <Route path="/helpOrders" component={HelpOrder} isPrivate />
      <Route path="/plans" component={PlanList} isPrivate />
      <Route path="/plan/create" component={PlanForm} isPrivate />
      <Route path="/plan/:id/edit" component={PlanForm} isPrivate />
      <Route path="/registrations" component={RegistrationList} isPrivate />
      <Route
        path="/registration/create"
        component={RegistrationForm}
        isPrivate
      />
      <Route
        path="/registration/:id/edit"
        component={RegistrationForm}
        isPrivate
      />
      <Route path="/students" component={StudentList} isPrivate />
      <Route path="/student/create" component={StudentForm} isPrivate />
      <Route path="/student/:id/edit" component={StudentForm} isPrivate />
    </Switch>
  );
}
