import React from 'react';
import { IconButton } from '@material-ui/core';
import ReplyIcon from '@material-ui/icons/Reply';
import { useHistory } from 'react-router';
import { useInsertChannelThreadMutation } from '../../../api/generated/graphql';
import { Alert } from '@material-ui/lab';
import { Message } from '../../../interfaces/message.interface';

interface ThreadReplyProps {
  channelName: string;
  message: Message;
}

const ThreadReply: React.FC<ThreadReplyProps> = (props) => {
  const history = useHistory();

  const [
    insertChannelThreadMutation,
    { data, loading, error },
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

  if (error) return <Alert>Error in Thread Reply</Alert>;

  if (props.message?.channel_threads?.length) {
    return (
      <div>
        <IconButton onClick={() => navigateToThreadChannel()}>
          <ReplyIcon fontSize="small" />
        </IconButton>
      </div>
    );
  }

  return (
    <div>
      <IconButton onClick={handleClick}>
        <ReplyIcon fontSize="small" />
      </IconButton>
    </div>
  );
};

export default ThreadReply;
