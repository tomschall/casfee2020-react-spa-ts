import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function LogoutButton() {
  const { isAuthenticated, logout } = useAuth0();

  return (
    <React.Fragment>
      <button
        onClick={() => {
          logout({
            returnTo: 'http://localhost:3000/',
          });
          window.localStorage.clear();
        }}
      >
        Log Out
      </button>
    </React.Fragment>
  );
}

export default LogoutButton;
