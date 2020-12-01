import React, { useState, useEffect } from 'react';
import { Grid, List, CircularProgress } from '@material-ui/core';
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
import ThreadInputContainer from './ThreadInputContainer';
import { Alert } from '@material-ui/lab';
import { ThreadMessage } from '../../../interfaces/message.interface';
import { ThreadParams } from '../../../interfaces/param.interface';

const useStyles = makeStyles((theme) => ({
  root: {
    overflowY: 'scroll',
    height: '70vh',
    marginTop: theme.spacing(5),
    padding: theme.spacing(3),
  },
  messageContainer: {
    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(10),
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(0),
    },
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(3),
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(0),
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0),
      paddingTop: theme.spacing(0),
      paddingBottom: theme.spacing(0),
    },
  },
}));

const Thread: React.FC = () => {
  const classes = useStyles();

  const [limit, setLimit] = useState(20);

  const { user, error: auth0Error } = useAuth0();

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

  useEffect(() => {
    if (currentChannel?.id === undefined) history.push(`/channel/${channel}`);
  }, []);

  if (loading || getChannelThreadLoading) return <CircularProgress />;

  if (error || getChannelThreadError) {
    console.log('error', error);
    return <Alert severity="error">Thread Error</Alert>;
  }

  const handleIncreaseLimit = () => {
    setLimit(limit + 20);
  };

  // console.log('getChannelThreadData', getChannelThreadData);

  return (
    <>
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={12} className={classes.messageContainer}>
            <List id="message-list">
              <ThreadMessageList
                messages={data?.channel_thread_message as ThreadMessage[]}
                user={user}
                channelThread={getChannelThreadData?.channel_thread[0]}
                currentChannel={currentChannel}
                isThreadList={false}
              />
            </List>
          </Grid>
          <Box maxWidth="xl" component="nav">
            <ThreadInputContainer
              channelThreadId={getChannelThreadData?.channel_thread[0]?.id}
            />
          </Box>
        </Grid>
      </div>
    </>
  );
};

export default Thread;
