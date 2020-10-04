import React from 'react';
import { useParams } from 'react-router';
import { useAuth0 } from '@auth0/auth0-react';
import { useRecoilState } from 'recoil';
import { useGetChannelByNameQuery } from '../../api/generated/graphql';
import { currentChannelState } from '../../atom';
import Chat from '../Chat';
import Loader from '../../layout/shared/Loader';

const ChatApp: React.FC = (props) => {
  const [currentChannel, setCurrentChannel] = useRecoilState<any>(
    currentChannelState,
  );

  const { isAuthenticated, isLoading: isLoadingAuth0, error } = useAuth0();
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
    return <Loader />;
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

  // TODO: REFACTOR PROPS

  return (
    <>
      {isAuthenticated && (
        <Chat
          channelId={currentChannel?.id}
          isPrivate={currentChannel.is_private}
          channelType={currentChannel.channel_type}
        />
      )}
    </>
  );
};

export default ChatApp;
