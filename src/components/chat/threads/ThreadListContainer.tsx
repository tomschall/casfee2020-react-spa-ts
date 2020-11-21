import React from 'react';
import { useWatchThreadsSubscription } from '../../../api/generated/graphql';
import ThreadList from './ThreadList';
import { Alert } from '@material-ui/lab';

const ThreadListContainer: React.FC = () => {
  const { data, error } = useWatchThreadsSubscription();

  if (error) {
    console.log('error', error);
    return <Alert severity="error">Thread Error</Alert>;
  }

  return (
    <>
      {data?.channel_thread?.map((channelThread) => {
        return <ThreadList channelThread={channelThread} />;
      })}
    </>
  );
};

export default ThreadListContainer;
