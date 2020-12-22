import React from 'react';
import {
  Typography,
  makeStyles,
  Box,
  CircularProgress,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Message } from '../../../interfaces/message.interface';
import { useWatchChannelThreadSubscription } from '../../../api/generated/graphql';

const useStyles = makeStyles((theme) => ({
  [theme.breakpoints.up('md')]: {
    messageText: {
      fontSize: 11,
      paddingBottom: '1rem',
    },
  },
  [theme.breakpoints.down('md')]: {
    messageText: {
      fontSize: 11,
      paddingBottom: '1rem',
    },
  },
  [theme.breakpoints.down('sm')]: {
    messageText: {
      fontSize: 11,
      paddingBottom: '1rem',
    },
  },
  link: {
    color: '#ffffff',
  },
}));

interface ThreadReplyInProps {
  channelName: string;
  message: Message;
}

const ThreadReplyIn: React.FC<ThreadReplyInProps> = ({
  channelName,
  message,
}) => {
  const classes = useStyles();

  const {
    data: channelThreadData,
    loading: channelThreadLoading,
    error: channelThreadError,
  } = useWatchChannelThreadSubscription({
    variables: {
      message_id: message?.id,
    },
  });

  return (
    <>
      {channelThreadData?.channel_thread[0]?.channel_thread_messages?.length ? (
        <Typography component="div" className={classes.messageText}>
          <Link
            className={classes.link}
            to={{
              pathname: `/channel/${channelName}/thread/${message?.id}`,
            }}
          >
            {`${
              channelThreadData?.channel_thread[0]?.channel_thread_messages
                ?.length
            } ${
              channelThreadData?.channel_thread[0]?.channel_thread_messages
                ?.length === 1
                ? 'reply'
                : 'replies'
            } `}
          </Link>
          <i className={classes.lastReply}>
            {`Last reply ${moment(
              channelThreadData?.channel_thread[0]?.channel_thread_messages[0]
                ?.timestamp,
            ).fromNow()}`}
          </i>
        </Typography>
      ) : (
        ''
      )}
    </>
  );
};

export default ThreadReplyIn;
