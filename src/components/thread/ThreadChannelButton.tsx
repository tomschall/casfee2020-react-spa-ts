import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useRecoilState } from 'recoil';
import { testState } from '../../atom.js';
import { Button } from '@material-ui/core';

const ThreadChannelButton: React.FC<any> = (props) => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const [recoilTestState, setTestState] = useRecoilState<any>(testState);

  const checkAndLogin = () => {
    loginWithRedirect();
  };

  const renderMessages = () => {
    console.log('props message', props.message);
    console.log('props channel_threads', props.channel_threads);
    setTestState(props.message);
  };

  return (
    <div>
      <Button
        onClick={renderMessages}
        size="small"
        variant="outlined"
        color="secondary"
      >
        Reply
      </Button>
    </div>
  );
};

export default ThreadChannelButton;
