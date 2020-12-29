import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Button from '@material-ui/core/Button';

const Login: React.FC<any> = () => {
  const { loginWithRedirect } = useAuth0();

  const checkAndLogin = () => {
    loginWithRedirect();
  };

  return (
    <>
      <Button
        size="large"
        variant="contained"
        color="secondary"
        onClick={checkAndLogin}
        aria-label="Login To Chat"
      >
        Login
      </Button>
    </>
  );
};

export default Login;
