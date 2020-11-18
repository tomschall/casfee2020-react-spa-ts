import React from 'react';
import { Typography, makeStyles, Box } from '@material-ui/core';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Message } from '../../../interfaces/message/message.interface';

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

  return (
    <Typography component="div" className={classes.messageText}>
      <Link
        className={classes.link}
        to={{
          pathname: `/channel/${channelName}/thread/${message?.id}`,
        }}
      >
        {`${
          message?.channel_threads[0]?.channel_thread_messages_aggregate
            .aggregate.count
        } ${
          message?.channel_threads[0]?.channel_thread_messages_aggregate
            .aggregate.count === 1
            ? 'reply'
            : 'replies'
        } `}
      </Link>
      <i className={classes.lastReply}>
        {`Last reply ${moment(
          message?.channel_threads[0]?.channel_thread_messages[0]?.timestamp,
        ).fromNow()}`}
      </i>
    </Typography>
  );
};

export default ThreadReplyIn;
