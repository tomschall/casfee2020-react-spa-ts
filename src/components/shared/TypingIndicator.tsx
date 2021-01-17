import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useGetUserIsTypingSubscription } from '../../api/generated/graphql';
import { useRecoilState } from 'recoil';
import { currentChannelState } from '../../atom';
import { Channel } from '../../interfaces/channel.interface';
import { logToConsole } from '../../helpers/helpers';

const TypingIndicator: React.FC = () => {
  const { user } = useAuth0();

  const [currentChannel] = useRecoilState<Channel>(currentChannelState);

  const { data, loading, error } = useGetUserIsTypingSubscription({
    variables: {
      self_id: user.sub,
      channel_id: currentChannel.id,
    },
  });

  if (error) {
    logToConsole('Typing Indicator Error...', error);
  }

  return (
    <>
      {!loading && data?.user_typing[0]?.username
        ? `${data.user_typing[0].username} is typing ...`
        : 'Type your message here ...'}
    </>
  );
};

export default TypingIndicator;
