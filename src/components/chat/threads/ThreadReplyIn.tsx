import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Message } from '../../../interfaces/message.interface';
import { useWatchChannelThreadSubscription } from '../../../api/generated/graphql';

const useStyles = makeStyles((theme) => ({
  messageText: {
    marginLeft: theme.spacing(2),
    paddingBottom: '1rem',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  [theme.breakpoints.up('md')]: {
    messageText: {
      fontSize: 12,
    },
  },
  [theme.breakpoints.down('md')]: {
    messageText: {
      fontSize: 11,
    },
  },
  [theme.breakpoints.down('sm')]: {
    messageText: {
      marginLeft: theme.spacing(0),
      paddingBottom: '.8rem',
    },
  },
  lastReply: {
    color: theme.palette.primary.main,
    fontStyle: 'italic',
    paddingLeft: theme.spacing(1),
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

  const { data: channelThreadData } = useWatchChannelThreadSubscription({
    variables: {
      message_id: message?.id,
    },
  });

  return (
    <>
      {channelThreadData?.channel_thread[0]?.channel_thread_messages?.length ? (
        <>
          <Typography
            variant="caption"
            color="textPrimary"
            component={Link}
            className={classes.messageText}
            to={{
              pathname: `/channel/${channelName}/thread/${message?.id}`,
            }}
            aria-label={`reply to message in channel thread ${channelName}`}
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
          </Typography>
          <Typography
            variant="caption"
            color="textSecondary"
            className={classes.lastReply}
          >
            {`Last reply ${moment(
              channelThreadData?.channel_thread[0]?.channel_thread_messages[0]
                ?.timestamp,
            ).fromNow()}`}
          </Typography>
        </>
      ) : (
        ''
      )}
    </>
  );
};

export default ThreadReplyIn;
