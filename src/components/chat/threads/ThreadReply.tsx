import React from 'react';
import { useHistory } from 'react-router';
import {
  useInsertChannelThreadMutation,
  useWatchChannelThreadSubscription,
} from '../../../api/generated/graphql';
import { IconButton, makeStyles } from '@material-ui/core';
import { Message } from '../../../interfaces/message.interface';
import ReplyIcon from '@material-ui/icons/Reply';
import { logToConsole } from '../../../helpers/helpers';

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(2),
  },
}));

interface ThreadReplyProps {
  channelName: string;
  message: Message;
}

const ThreadReply: React.FC<ThreadReplyProps> = (props) => {
  const history = useHistory();
  const classes = useStyles();

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

  const navigateToThreadChannel = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    history.push(`/channel/${props.channelName}/thread/${props.message?.id}`);
  };

  const handleClick = async (e: React.SyntheticEvent) => {
    e.stopPropagation();
    await insertChannelThreadMutation();
    navigateToThreadChannel(e);
  };

  if (error || channelThreadError) {
    logToConsole('Error in Thread Reply', error, channelThreadError);
  }

  if (channelThreadLoading)
    return (
      <>
        <IconButton className={classes.root} aria-label="reply to message">
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
          className={classes.root}
          onClick={(e) => navigateToThreadChannel(e)}
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
      <IconButton
        className={classes.root}
        onClick={handleClick}
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
};

export default ThreadReply;
