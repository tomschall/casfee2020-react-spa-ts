import React from 'react';
import { useWatchThreadsSubscription } from '../../../api/generated/graphql';
import ThreadList from './ThreadList';
import { Alert } from '@material-ui/lab';
import { Box, Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    overflowY: 'scroll',
    height: '100vh',
    marginTop: theme.spacing(0),
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(3),
  },
  end: {
    marginBottom: '2rem',
  },
  messageContainer: {
    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(10),
      paddingTop: theme.spacing(12),
      paddingBottom: theme.spacing(0),
    },
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(2),
      paddingTop: theme.spacing(12),
      paddingBottom: theme.spacing(0),
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
      paddingTop: theme.spacing(12),
      paddingBottom: theme.spacing(0),
    },
  },
}));

const ThreadListContainer: React.FC = () => {
  const classes = useStyles();
  const { data, error } = useWatchThreadsSubscription();

  if (error) {
    console.log('error', error);
    return <Alert severity="error">Thread Error</Alert>;
  }

  return (
    <>
      <div className={classes.root}>
        <Grid container>
          {data?.channel_thread?.map((channelThread, index) => {
            if (channelThread.channel_thread_messages.length)
              return (
                <Grid
                  key={index}
                  item
                  xs={12}
                  className={classes.messageContainer}
                >
                  <ThreadList channelThread={channelThread} />
                </Grid>
              );
          })}
          <Box className={classes.end}>&nbsp;</Box>
        </Grid>
      </div>
    </>
  );
};

export default ThreadListContainer;
