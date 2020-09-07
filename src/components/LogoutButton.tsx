import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Button from '@material-ui/core/Button';

function LogoutButton() {
  const { logout } = useAuth0();

  return (
    <React.Fragment>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          logout({
            returnTo: 'http://localhost:3000/',
          });
          window.localStorage.clear();
        }}
      >
        Log Out
      </Button>
    </React.Fragment>
  );
}

export default LogoutButton;
