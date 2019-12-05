import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SingUp';

import HelpOrder from '../pages/HelpOrder';
import Plan from '../pages/Plan';
import Registration from '../pages/Registration';
import Student from '../pages/Student';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />

      <Route path="helpOrders" component={HelpOrder} />
      <Route path="plans" component={Plan} />
      <Route path="registrations" component={Registration} />
      <Route path="student" component={Student} />
    </Switch>
  );
}
