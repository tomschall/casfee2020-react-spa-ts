import React, { useEffect } from 'react';
import { CircularProgress, makeStyles } from '@material-ui/core';
import { useWatchThreadsSubscription } from '../../../api/generated/graphql';
import ThreadList from './ThreadList';
import { Alert } from '@material-ui/lab';

const ThreadListContainer: React.FC = () => {
  const { data, loading, error } = useWatchThreadsSubscription({
    variables: {},
  });

  useEffect(() => {}, []);

  if (loading) return <CircularProgress />;

  if (error) {
    console.log('error', error);
    return <Alert severity="error">Thread Error</Alert>;
  }

  console.log('data', data);

  return (
    <>
      {data?.channel_thread?.map((channelThread) => {
        return <ThreadList channelThread={channelThread} />;
      })}
    </>
  );
};

export default ThreadListContainer;
