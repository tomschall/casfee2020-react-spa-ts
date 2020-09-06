import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const ChannelThread: React.FC<any> = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  const checkAndLogin = () => {
    loginWithRedirect();
  };

  return (
    <React.Fragment>
      <a href="">Reply</a>
    </React.Fragment>
  );
};

export default ChannelThread;