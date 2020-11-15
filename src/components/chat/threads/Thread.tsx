import React, { useState, useEffect } from 'react';
import { Grid, List } from '@material-ui/core';
import { Message } from '../../../interfaces/message/message.interface';
import { Box } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { makeStyles } from '@material-ui/core/styles';
import { useRecoilState } from 'recoil';
import { currentChannelState } from '../../../atom';
import { useWatchChannelThreadMessagesSubscription } from '../../../api/generated/graphql';
import ThreadMessageList from './ThreadMessageList';
import ThreadMenuBar from './ThreadMenuBar';

const useStyles = makeStyles((theme) => ({
  root: {
    overflowY: 'scroll',
    height: '75vh',
    marginTop: theme.spacing(5),
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

  const { messageId } = useParams();

  const { data, loading, error } = useWatchChannelThreadMessagesSubscription({
    variables: {
      limit,
      message_id: messageId,
    },
  });

  useEffect(() => {
    console.log('Thread Component mounted');
  }, []);

  const handleIncreaseLimit = () => {
    setLimit(limit + 20);
  };

  console.log('current channel', currentChannel);
  console.log('data', data);

  return (
    <>
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={12} className={classes.messageContainer}>
            <List id="message-list">
              <ThreadMessageList
                messages={data?.channel_thread_message as any[]}
                user={user}
              />
            </List>
          </Grid>
          <Box maxWidth="xl" component="nav">
            <ThreadMenuBar
              channelId={currentChannel.id}
              channel_thread_id={
                data?.channel_thread_message[0]?.channel_thread_id ?? 0
              }
            />
          </Box>
        </Grid>
      </div>
    </>
  );
};

export default Thread;
