import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Button from '@material-ui/core/Button';

const Login: React.FC<any> = () => {
  const { loginWithRedirect } = useAuth0();

  const checkAndLogin = () => {
    //localStorage.setItem('shouldLoad', 'true');
    loginWithRedirect();

  };

  return (
    <>
      <Button
        size="large"
        variant="contained"
        color="secondary"
        onClick={checkAndLogin}
      >
        Login
      </Button>
    </>
  );
};

export default Login;
