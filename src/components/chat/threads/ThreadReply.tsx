import React from 'react';
import { IconButton } from '@material-ui/core';
import ReplyIcon from '@material-ui/icons/Reply';
import { useHistory } from 'react-router';
import { useInsertChannelThreadMutation } from '../../../api/generated/graphql';
import { Alert } from '@material-ui/lab';
import { Message } from '../../../interfaces/message.interface';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  reply: {
    transform: 'scaleX(-1)',
  },
}));

interface ThreadReplyProps {
  channelName: string;
  message: Message;
}

const ThreadReply: React.FC<ThreadReplyProps> = (props) => {
  const classes = useStyles();

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
          <ReplyIcon fontSize="small" className={classes.reply} />
        </IconButton>
      </div>
    );
  }

  return (
    <div>
      <IconButton onClick={handleClick}>
        <ReplyIcon fontSize="small" className={classes.reply} />
      </IconButton>
    </div>
  );
};

export default ThreadReply;
