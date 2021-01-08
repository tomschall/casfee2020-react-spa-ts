import React from 'react';
import { Box, Badge, makeStyles, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Message } from '../../../interfaces/message.interface';
import { useWatchChannelThreadSubscription } from '../../../api/generated/graphql';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';

const useStyles = makeStyles((theme) => ({
  lastReply: {
    color: theme.palette.primary.main,
    fontStyle: 'italic',
    marginLeft: theme.spacing(0),
    [theme.breakpoints.down('md')]: {},
  },

  messageText: {
    fontSize: 11,
    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.spacing(2),
      paddingBottom: theme.spacing(1),
      paddingTop: theme.spacing(2),
    },
    [theme.breakpoints.down('md')]: {
      paddingLeft: theme.spacing(0),
      paddingBottom: theme.spacing(0),
      paddingTop: theme.spacing(1),
    },
    [theme.breakpoints.down('sm')]: {
      messageText: {
        paddingBottom: theme.spacing(0),
      },
    },
  },

  link: {
    marginRight: theme.spacing(2),
    color: theme.palette.primary.main,
    transform: 'scale(.8)',
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

  const defaultProps = {
    color: 'secondary' as 'primary',
    children: <QuestionAnswerIcon fontSize="small" />,
  };

  return (
    <>
      {channelThreadData?.channel_thread[0]?.channel_thread_messages?.length ? (
        <Box
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
          className={classes.messageText}
        >
          <Badge
            component={Link}
            to={{
              pathname: `/channel/${channelName}/thread/${message?.id}`,
            }}
            badgeContent={
              channelThreadData?.channel_thread[0]?.channel_thread_messages
                ?.length
            }
            {...defaultProps}
            className={classes.link}
          />

          <Typography variant="caption" className={classes.lastReply}>
            {`Last reply ${moment(
              channelThreadData?.channel_thread[0]?.channel_thread_messages[0]
                ?.timestamp,
            ).fromNow()}`}
          </Typography>
        </Box>
      ) : (
        ''
      )}
    </>
  );
};

export default ThreadReplyIn;
