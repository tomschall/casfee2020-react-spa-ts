import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useRecoilState } from 'recoil';
import { testState } from '../../../atom.js';
import { IconButton } from '@material-ui/core';
import ReplyIcon from '@material-ui/icons/Reply';
import { useHistory } from 'react-router';

const ThreadReply: React.FC<any> = (props) => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const [recoilTestState, setTestState] = useRecoilState<any>(testState);
  let history = useHistory();

  const renderMessages = () => {
    history.push(`/thread/${props.message?.id}`);
    // console.log('message', props.message);
    // console.log('param', props.message?.id);
  };

  return (
    <div>
      <IconButton onClick={renderMessages}>
        <ReplyIcon fontSize="small" />
      </IconButton>
    </div>
  );
};

export default ThreadReply;
