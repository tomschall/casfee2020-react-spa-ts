import React, { useState } from 'react';
import MessageList from './MessageList';
import { Message } from '../interfaces/message/message.interface';
import { useWatchMessagesSubscription } from '../api/generated/graphql';
import { Button } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';

interface ChatProps {
  channelId: number;
}

const Chat: React.FC<ChatProps> = ({ channelId }) => {
  const [ limit, setLimit ] = useState(20);
  const { data, loading, error } =  useWatchMessagesSubscription({
    variables: {
      channelId: channelId,
      limit: limit
    },
    fetchPolicy: 'network-only'
  });

  if (error) {
    return <Alert severity="error">Messages could not be loaded.</Alert>
  }

  if (loading) {
    return <CircularProgress />;
  }

  const handleIncreaseLimit = () => {
    setLimit(limit + 20)
  };

  return (
    <>
      <Button onClick={handleIncreaseLimit}>Load more...</Button>
      <MessageList messages={data?.messages as Message[]} />
    </>
  );
};

export default Chat;
