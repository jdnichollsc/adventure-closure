import React, { ComponentType } from 'react';
import { RouteProps, Route, Redirect } from 'react-router-dom';

import { useAuth } from '../../hooks';

const PrivateRoute: React.FC<RouteProps & { component: ComponentType }> = ({
  component: Component,
  ...rest
}) => {
  const { state } = useAuth()
  return (
    <Route
      {...rest}
      render={props => state.user ? <Component {...props} /> : (
        <Redirect
          to={{
            pathname: '/login',
            state: { logout: true } 
          }}
        />
      )}
    />
  );
};

export default PrivateRoute;
