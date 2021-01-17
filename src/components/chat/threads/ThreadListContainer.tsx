import React from 'react';
import { useWatchThreadsSubscription } from '../../../api/generated/graphql';
import { ChannelThreadList } from '../../../interfaces/thread.interface';
import ThreadList from './ThreadList';
import { Alert } from '@material-ui/lab';
import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import Loader from '../../shared/Loader';
import { logToConsole } from '../../../helpers/helpers';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    marginTop: theme.spacing(0),
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0),
  },
  messageContainer: {
    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(10),
      paddingBottom: theme.spacing(8),
    },
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(2),
      paddingBottom: theme.spacing(8),
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
      paddingBottom: theme.spacing(4),
    },
    paddingTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
  },
}));

const ThreadListContainer: React.FC = () => {
  const classes = useStyles();
  const { data, error, loading } = useWatchThreadsSubscription();

  if (error) {
    logToConsole('Thread Error', error);
    return <Alert severity="error">Thread Error</Alert>;
  }

  if (loading) {
    return (
      <>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          style={{ height: '100vh' }}
        >
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <Loader />
            <Typography variant="caption" color="secondary">
              Loading threads
            </Typography>
          </Box>
        </Box>
      </>
    );
  }

  return (
    <>
      <div className={classes.root}>
        <Grid container>
          {data?.channel_thread?.map((channelThread, index) => {
            if (channelThread && channelThread.channel_thread_messages.length)
              return (
                <>
                  <Grid
                    key={index}
                    item
                    xs={12}
                    className={classes.messageContainer}
                  >
                    <ThreadList
                      channelThread={channelThread as ChannelThreadList}
                    />
                  </Grid>
                </>
              );
          })}
        </Grid>
      </div>
    </>
  );
};

export default ThreadListContainer;
