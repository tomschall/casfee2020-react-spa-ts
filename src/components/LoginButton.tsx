import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton: React.FC<any> = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  const checkAndLogin = () => {
    //localStorage.setItem('shouldLoad', 'true');
    loginWithRedirect();
  };

  return (
    <React.Fragment>
      <button onClick={checkAndLogin}>Log in</button>
    </React.Fragment>
  );
};

export default LoginButton;
