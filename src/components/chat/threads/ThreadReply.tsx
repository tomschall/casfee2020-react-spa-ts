import React from 'react';
import { IconButton } from '@material-ui/core';
import ReplyIcon from '@material-ui/icons/Reply';
import { useHistory } from 'react-router';
import {
  useInsertChannelThreadMutation,
  useWatchChannelThreadSubscription,
} from '../../../api/generated/graphql';
import { Alert } from '@material-ui/lab';
import { Message } from '../../../interfaces/message.interface';

interface ThreadReplyProps {
  channelName: string;
  message: Message;
}

const ThreadReply: React.FC<ThreadReplyProps> = (props) => {
  const history = useHistory();

  const {
    data: channelThreadData,
    loading: channelThreadLoading,
    error: channelThreadError,
  } = useWatchChannelThreadSubscription({
    variables: {
      message_id: props.message?.id,
    },
  });

  const [
    insertChannelThreadMutation,
    { error },
  ] = useInsertChannelThreadMutation({
    variables: {
      message_id: props.message?.id,
    },
  });

  const navigateToThreadChannel = () => {
    history.push(`/channel/${props.channelName}/thread/${props.message?.id}`);
  };

  const handleClick = async () => {
    await insertChannelThreadMutation();
    navigateToThreadChannel();
  };

  if (error || channelThreadError) return <Alert>Error in Thread Reply</Alert>;

  if (channelThreadLoading)
    return (
      <div>
        <IconButton>
          <ReplyIcon
            color="primary"
            fontSize="small"
            style={{ transform: 'scaleX(-1)' }}
          />
        </IconButton>
      </div>
    );

  if (channelThreadData?.channel_thread_message?.length) {
    return (
      <div>
        <IconButton onClick={() => navigateToThreadChannel()}>
          <ReplyIcon
            color="primary"
            fontSize="small"
            style={{ transform: 'scaleX(-1)' }}
          />
        </IconButton>
      </div>
    );
  }

  return (
    <div>
      <IconButton onClick={handleClick}>
        <ReplyIcon
          color="primary"
          fontSize="small"
          style={{ transform: 'scaleX(-1)' }}
        />
      </IconButton>
    </div>
  );
};

export default ThreadReply;
