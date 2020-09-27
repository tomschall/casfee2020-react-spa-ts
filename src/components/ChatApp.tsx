import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useAuth0 } from '@auth0/auth0-react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import { useGetChannelByNameQuery } from '../api/generated/graphql';
import ChannelTreadSidebar from './ChannelThreadSidebar';
import Chat from './Chat';
import { useRecoilState } from 'recoil';
import { currentChannelState } from '../atom';

const ChatApp: React.FC = (props) => {
  const [currentChannel, setCurrentChannel] = useRecoilState<any>(
    currentChannelState,
  );

  const {
    isAuthenticated,
    isLoading: isLoadingAuth0,
    user,
    error,
  } = useAuth0();
  const { channel: channelName } = useParams();

  const {
    data,
    loading: channelLoading,
    error: channelError,
  } = useGetChannelByNameQuery({
    variables: {
      name: channelName,
    },
  });

  if (isLoadingAuth0 || channelLoading) {
    return <CircularProgress />;
  }

  if (
    !currentChannel ||
    (currentChannel && currentChannel.name !== channelName)
  ) {
    setCurrentChannel(data?.channel[0]);
  }

  if (error || channelError || !currentChannel) {
    return <React.Fragment>Error: {error}</React.Fragment>;
  }

  return <>{isAuthenticated && <Chat channelId={currentChannel?.id} />}</>;
};

export default ChatApp;
