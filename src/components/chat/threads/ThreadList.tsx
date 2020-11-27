import React, { useState } from 'react';
import { Grid, List } from '@material-ui/core';
import { useAuth0 } from '@auth0/auth0-react';
import { makeStyles } from '@material-ui/core/styles';
import { useWatchChannelThreadMessagesSubscription } from '../../../api/generated/graphql';
import ThreadMessageList from './ThreadMessageList';
import { Alert } from '@material-ui/lab';
import { ThreadMessage } from '../../../interfaces/message.interface';
import ThreadListMenuBar from './ThreadListMenuBar';

const useStyles = makeStyles((theme) => ({
  root: {
    overflowY: 'scroll',
    marginTop: theme.spacing(5),
  },
  messageContainer: {
    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(5),
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

interface ThreadListProps {
  channelThread: any;
}

const ThreadList: React.FC<ThreadListProps> = ({ channelThread }) => {
  const classes = useStyles();

  const [limit, setLimit] = useState(20);

  const { user, error: auth0Error } = useAuth0();

  const { data, error } = useWatchChannelThreadMessagesSubscription({
    variables: {
      limit,
      message_id: channelThread.message_id,
    },
  });

  if (error || auth0Error) {
    console.log('error', error);
    return <Alert severity="error">Thread Error</Alert>;
  }

  const handleIncreaseLimit = () => {
    setLimit(limit + 20);
  };

  return (
    <>
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={12} className={classes.messageContainer}>
            <List>
              <ThreadMessageList
                messages={data?.channel_thread_message as ThreadMessage[]}
                user={user}
                channelThread={channelThread}
                currentChannel={channelThread.message.channel}
                isThreadList={true}
              />

              <ThreadListMenuBar
                channelId={channelThread.message?.id}
                channelThreadId={channelThread.id}
              />
            </List>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default ThreadList;
