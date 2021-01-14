import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Button from '@material-ui/core/Button';

const Login: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <>
      <Button
        size="large"
        variant="contained"
        color="secondary"
        onClick={loginWithRedirect}
        aria-label="Login To Chat"
      >
        Login
      </Button>
    </>
  );
};

export default Login;
