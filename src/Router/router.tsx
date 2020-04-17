import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from '../CommonViews/HomePage/HomePage';
import Test from '../CommonViews/Test';

const Router = () => {
  
  return (
    <Switch >
      <Route exact path='/' component={HomePage} />
      <Route exact path='/test' component={Test} />
    </Switch>
  );
};

export default Router;
