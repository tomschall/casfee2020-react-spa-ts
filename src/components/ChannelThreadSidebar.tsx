import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useRecoilState } from 'recoil';
import { testState } from '../atom.js';

const ChannelThreadSideBar: React.FC<any> = (props) => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const [recoilTestState, setTestState] = useRecoilState<any>(testState);

  return (
    <React.Fragment>{recoilTestState ? recoilTestState : ''}</React.Fragment>
  );
};

export default ChannelThreadSideBar;
