import React, { useState, useEffect, useRef } from 'react';
import { Grid, List } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { makeStyles } from '@material-ui/core/styles';
import { useRecoilState } from 'recoil';
import { currentChannelState } from '../../../atom';
import {
  useWatchChannelThreadMessagesSubscription,
  useGetChannelThreadQuery,
} from '../../../api/generated/graphql';
import ThreadMessageList from './ThreadMessageList';
import Loader from '../../shared/Loader';
import { Alert } from '@material-ui/lab';
import { ThreadMessage } from '../../../interfaces/message.interface';
import { ThreadParams } from '../../../interfaces/param.interface';
import MenuBar from '../../shared/MenuBar';
import ThreadMessageInput from './ThreadMessageInput';

const useStyles = makeStyles((theme) => ({
  root: {
    overflowY: 'scroll',
    height: '100vh',
    marginTop: theme.spacing(0),
    padding: theme.spacing(2),
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(5),
  },
  messageInput: {
    position: 'fixed',
    bottom: 0,
    padding: theme.spacing(2),
    background: theme.palette.background.default,
    zIndex: 1000,
    [theme.breakpoints.up('md')]: {
      width: '70vw',
    },
    [theme.breakpoints.up('lg')]: {
      width: '75vw',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100vw',
    },
  },
}));

const Thread: React.FC = () => {
  const classes = useStyles();
  const [limit, setLimit] = useState(20);
  const { user, error: auth0Error } = useAuth0();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [currentChannel, setCurrentChannel] = useRecoilState<any>(
    currentChannelState,
  );
  let history = useHistory();

  const { messageId, channel } = useParams<ThreadParams>();

  const { data, loading, error } = useWatchChannelThreadMessagesSubscription({
    variables: {
      limit,
      message_id: parseInt(messageId),
    },
    fetchPolicy: 'network-only',
  });

  const {
    data: getChannelThreadData,
    loading: getChannelThreadLoading,
    error: getChannelThreadError,
  } = useGetChannelThreadQuery({
    variables: {
      message_id: parseInt(messageId),
    },
  });

  const handleIncreaseLimit = () => {
    setLimit(limit + 20);
  };

  const scrollToBottom = () => {
    if (typeof messagesEndRef === 'object') {
      messagesEndRef?.current?.scrollIntoView();
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [data]);

  useEffect(() => {
    if (currentChannel?.id === undefined) history.push(`/channel/${channel}`);
  }, []);

  if (loading || getChannelThreadLoading) return <Loader />;

  if (error || getChannelThreadError) {
    console.log('error', error);
    return <Alert severity="error">Thread Error</Alert>;
  }

  return (
    <>
      <Box className={classes.root}>
        <List id="message-list">
          <ThreadMessageList
            messages={data?.channel_thread_message as ThreadMessage[]}
            user={user}
            channelThread={getChannelThreadData?.channel_thread[0]}
            currentChannel={currentChannel}
          />
        </List>
        <div ref={messagesEndRef} />
      </Box>
      <Box className={classes.messageInput}>
        <MenuBar channelId={currentChannel?.id}>
          <ThreadMessageInput
            channelId={currentChannel?.id}
            channelThreadId={getChannelThreadData?.channel_thread[0]?.id}
          />
        </MenuBar>
      </Box>
    </>
  );
};

export default Thread;
