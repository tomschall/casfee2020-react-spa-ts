import React from 'react';
import { useParams } from 'react-router';
import { useAuth0 } from '@auth0/auth0-react';
import { useRecoilState } from 'recoil';
import { useGetChannelByNameQuery } from '../../api/generated/graphql';
import { currentChannelState } from '../../atom';
import Chat from './Chat';
import Loader from '../shared/Loader';
import { ChatParams } from '../../interfaces/param.interface';
import { Channel } from '../../interfaces/channel.interface';

const ChatApp: React.FC = () => {
  const [currentChannel, setCurrentChannel] = useRecoilState<Channel>(
    currentChannelState,
  );

  const { isAuthenticated, isLoading: isLoadingAuth0, error } = useAuth0();
  const { channel: channelName } = useParams<ChatParams>();

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
    return <Loader />;
  }

  if (
    (!currentChannel && data?.channel[0] !== undefined) ||
    (currentChannel &&
      currentChannel.name !== channelName &&
      data?.channel[0] !== undefined)
  ) {
    setCurrentChannel(data?.channel[0]);
  }

  if (error || channelError) {
    return <>Error: {error}</>;
  }

  return (
    <>
      {isAuthenticated && currentChannel && (
        <Chat channelId={currentChannel?.id} />
      )}
    </>
  );
};

export default ChatApp;
