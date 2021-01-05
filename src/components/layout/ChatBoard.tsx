import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import ChatContainer from '../chat/ChatContainer';
import { useSetUserOnlineMutation } from '../../api/generated/graphql';

const ChatBoard: React.FC = () => {
  const { user } = useAuth0();

  const [sendUserIsOnline] = useSetUserOnlineMutation({
    variables: { user_id: user?.sub },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (user?.sub !== undefined) {
        sendUserIsOnline();
      }
    }, 9000);
    return function cleanup() {
      clearInterval(interval);
    };
  }, []);

  return <ChatContainer />;
};

export default ChatBoard;
