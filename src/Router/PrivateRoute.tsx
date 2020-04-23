import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { IRootState } from '../Store/store';

const PrivateRoute = ({ children, ...args }: RouteProps) => {

  const userId = useSelector((state: IRootState) => state.user._id);

  return (
    <Route
      {...args}
      render={({ location }) =>
        userId
          ? children
          : <Redirect
            to={{
              pathname: '/signin',
              state: { from: location }
            }}
          />
      }
    />
  );
};

export default PrivateRoute;
