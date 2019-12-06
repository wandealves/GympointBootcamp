import React from 'react';
import { Switch} from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SingUp';

import Dashborad from '../pages/Dashboard';
import HelpOrder from '../pages/HelpOrder';
import Plan from '../pages/Plan';
import Registration from '../pages/Registration';
import Student from '../pages/Student';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />

      <Route path="/dashborad" component={Dashborad} isPrivate />
      <Route path="/helpOrders" component={HelpOrder}  isPrivate/>
      <Route path="/plans" component={Plan} isPrivate/>
      <Route path="/registrations" component={Registration} isPrivate/>
      <Route path="/students" component={Student} isPrivate/>
    </Switch>
  );
}
