import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function LogoutButton() {
  const { isAuthenticated, logout } = useAuth0();

  return isAuthenticated ? (
    <React.Fragment>
      <button
        onClick={() => {
          logout();
          window.localStorage.clear();
        }}
      >
        Log Out
      </button>
    </React.Fragment>
  ) : (
    <React.Fragment></React.Fragment>
  );
}

export default LogoutButton;
