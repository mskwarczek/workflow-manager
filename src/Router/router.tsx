import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import HomePage from '../CommonViews/HomePage/HomePage';
import RegisterPage from '../CommonViews/RegisterPage/RegisterPage';
import SignInPage from '../CommonViews/SignInPage/SignInPage';
import Test from '../CommonViews/Test';

const Router = () => {
  
  return (
    <Switch >
      <PrivateRoute exact path='/'><HomePage /></PrivateRoute>
      <Route exact path='/register' component={RegisterPage} />
      <Route exact path='/signin' component={SignInPage} />
      <Route exact path='/test' component={Test} />
    </Switch>
  );
};

export default Router;
