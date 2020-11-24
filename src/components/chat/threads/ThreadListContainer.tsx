import React from 'react';
import { useWatchThreadsSubscription } from '../../../api/generated/graphql';
import ThreadList from './ThreadList';
import { Alert } from '@material-ui/lab';
import { Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: '2rem',
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
      {data?.channel_thread?.map((channelThread) => {
        return <ThreadList channelThread={channelThread} />;
      })}
      <Box className={classes.root}></Box>
    </>
  );
};

export default ThreadListContainer;
