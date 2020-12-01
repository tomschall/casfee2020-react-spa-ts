import React from 'react';
import { useWatchThreadsSubscription } from '../../../api/generated/graphql';
import ThreadList from './ThreadList';
import { Alert } from '@material-ui/lab';
import { Box, Grid, makeStyles } from '@material-ui/core';
import ThreadMenuBar from './ThreadMenuBar';

const useStyles = makeStyles((theme) => ({
  root: {
    overflowY: 'scroll',
    height: '90vh',
    marginTop: theme.spacing(5),
  },
  end: {
    marginBottom: '2rem',
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
      padding: theme.spacing(1),
    },
  },
}));

const ThreadListContainer: React.FC = () => {
  const { data, error } = useWatchThreadsSubscription();
  const classes = useStyles();

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
          <Box maxWidth="xl" component="nav">
            <ThreadMenuBar />
          </Box>
        </Grid>
      </div>
    </>
  );
};

export default ThreadListContainer;
