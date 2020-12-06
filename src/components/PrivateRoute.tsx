import React from 'react';
import { Route } from 'react-router-dom';
import { Box, Typography } from '@material-ui/core';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import Loader from './shared/Loader';

interface PrivateRouteProps {
  component: any;
  path: any;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component, ...args }) => {
  return (
    <Route
      component={withAuthenticationRequired(component, {
        onRedirecting: () => (
          <>
            <Loader />
          </>
        ),
      })}
      {...args}
    />
  );
};

export default PrivateRoute;
