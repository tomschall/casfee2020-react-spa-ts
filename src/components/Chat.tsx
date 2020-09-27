import React, { useState, useEffect } from 'react';
import MessageList from './MessageList';
import { Message } from '../interfaces/message/message.interface';
import { useWatchMessagesSubscription } from '../api/generated/graphql';
import { Button, withStyles, Theme } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import ChatInput from './ChatInput';
import { blue } from '@material-ui/core/colors';

interface ChatProps {
  channelId: number;
}

const Chat: React.FC<ChatProps> = ({ channelId }) => {
  const [limit, setLimit] = useState(20);
  const [lastMessage, setLastMessage] = useState({});

  let preLastMessageId = 0;

  const { data, loading, error } = useWatchMessagesSubscription({
    variables: {
      channelId: channelId,
      limit: limit,
    },
    fetchPolicy: 'network-only',
  });

  console.log(data);

  useEffect(() => {
    setLastMessage({});
  }, [data]);

  if (error) {
    return <Alert severity="error">Messages could not be loaded.</Alert>;
  }

  if (loading) {
    return <CircularProgress />;
  }

  if (data) {
    preLastMessageId = data?.messages[0]?.id;
  }

  const handleIncreaseLimit = () => {
    setLimit(limit + 20);
  };

  const handleSetLastMessage = (lastMessage: Message) => {
    setLastMessage(lastMessage);
  };

  return (
    <>
      <MessageList
        messages={data?.messages as Message[]}
        lastMessage={lastMessage}
        preLastMessageId={preLastMessageId}
      />
    </>
  );
};

export default Chat;
