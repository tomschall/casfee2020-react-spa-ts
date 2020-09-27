import React from 'react';
import { Route } from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import Loader from '../layout/shared/Loader';

interface PrivateRouteProps {
  component: any;
  path: any;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component, ...args }) => {
  return (
    <Route
      component={withAuthenticationRequired(component, {
        onRedirecting: () => <Loader />,
      })}
      {...args}
    />
  );
};

export default PrivateRoute;
