import React from 'react';
import { useHistory } from 'react-router';
import {
  useInsertChannelThreadMutation,
  useWatchChannelThreadSubscription,
} from '../../../api/generated/graphql';
import { Alert } from '@material-ui/lab';
import { IconButton } from '@material-ui/core';
import { Message } from '../../../interfaces/message.interface';
import ReplyIcon from '@material-ui/icons/Reply';

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
      <>
        <IconButton aria-label="reply to message">
          <ReplyIcon
            color="primary"
            fontSize="small"
            style={{ transform: 'scaleX(-1)' }}
            aria-label="reply to message"
          />
        </IconButton>
      </>
    );

  if (channelThreadData?.channel_thread?.length) {
    return (
      <>
        <IconButton
          onClick={() => navigateToThreadChannel()}
          aria-label="reply to message"
        >
          <ReplyIcon
            color="primary"
            fontSize="small"
            style={{ transform: 'scaleX(-1)' }}
            aria-label="reply to message"
          />
        </IconButton>
      </>
    );
  }

  return (
    <>
      <IconButton onClick={handleClick} aria-label="reply to message">
        <ReplyIcon
          color="primary"
          fontSize="small"
          style={{ transform: 'scaleX(-1)' }}
          aria-label="reply to message"
        />
      </IconButton>
    </>
  );
};

export default ThreadReply;
