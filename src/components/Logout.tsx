import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { IconButton } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const Logout: React.FC = () => {
  const { logout } = useAuth0();

  return (
    <>
      <IconButton
        color="primary"
        size="small"
        onClick={() => {
          logout({
            returnTo: process.env.REACT_APP_AUTH0_LOGOUT_URL,
          });
          window.sessionStorage.clear();
        }}
        aria-label="Logout"
      >
        <ExitToAppIcon />
      </IconButton>
    </>
  );
};

export default Logout;
