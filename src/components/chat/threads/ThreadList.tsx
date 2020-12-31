import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useWatchChannelThreadMessagesSubscription } from '../../../api/generated/graphql';
import { ThreadMessage } from '../../../interfaces/message.interface';
import { Alert } from '@material-ui/lab';
import { List } from '@material-ui/core';
import ThreadListInputContainer from './ThreadListInputContainer';
import ThreadMessageList from './ThreadMessageList';

interface ThreadListProps {
  channelThread: any;
}

const ThreadList: React.FC<ThreadListProps> = ({ channelThread }) => {
  const [limit, setLimit] = useState(20);
  const { user, error: auth0Error } = useAuth0();

  const { data, error } = useWatchChannelThreadMessagesSubscription({
    variables: {
      limit,
      message_id: channelThread.message_id,
    },
  });

  if (error || auth0Error) {
    console.log('error', error);
    return <Alert severity="error">Thread Error</Alert>;
  }

  const handleIncreaseLimit = () => {
    setLimit(limit + 20);
  };

  return (
    <>
      <List component="div">
        <ThreadMessageList
          messages={data?.channel_thread_message as ThreadMessage[]}
          user={user}
          channelThread={channelThread}
          currentChannel={channelThread.message.channel}
          handleIncreaseLimit={handleIncreaseLimit}
          limit={limit}
        />
        <ThreadListInputContainer
          channelId={channelThread.message?.id}
          channelThreadId={channelThread.id}
        />
      </List>
    </>
  );
};

export default ThreadList;
