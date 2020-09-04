import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton: React.FC<any> = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  return (
    <React.Fragment>
      <button onClick={loginWithRedirect}>Log in</button>
    </React.Fragment>
  );
};

export default LoginButton;
