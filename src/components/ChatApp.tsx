import React, { useState, useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';
import Chat from './Chat';
import ChatInput from './ChatInput';
import OnlineUser from './OnlineUser';
import { useRecoilState } from 'recoil';
import { atomChannelState } from '../atom.js';
import { useParams } from 'react-router';
import LogoutButton from './LogoutButton';
import { useApolloClient } from 'react-apollo';

const USER_IS_ONLINE = gql`
  mutation($user_id: String) {
    update_user(
      _set: { last_seen: "now()" }
      where: { auth0_user_id: { _eq: $user_id } }
    ) {
      affected_rows
    }
  }
`;

const ROOM = gql`
  query {
    channel {
      name
      id
    }
  }
`;

interface ChatAppProps {
  username: string;
  user_id: string;
  userState: any;
}

const ChatApp: React.FC<ChatAppProps> = ({ username, user_id, userState }) => {
  const [channelState, setChannel] = useRecoilState<any>(atomChannelState);

  let { channel } = useParams();

  const client = useApolloClient();

  useEffect(() => {
    console.log('ChickenFestChat did mount');
    const interval = setInterval(async () => {
      client.mutate({
        mutation: USER_IS_ONLINE,
        variables: {
          user_id,
        },
      });
    }, 2000);

    (async () => {
      const channelObj = await client.query({
        query: ROOM,
      });
      console.log(
        'ChickenFestChat did mount channelObj aaa',
        channelObj.data.channel,
      );
      if (channelObj && channelObj.data && channelObj.data.channel) {
        setChannel(channelObj.data.channel);
      }
    })();

    return function cleanup() {
      console.log('ChickenFestChat did unmount');
      clearInterval(interval);
    };
  }, []);

  console.log('channelState', channelState);

  const userIsMemberOfChannel = userState.user_channels?.filter(
    (e: any) => e.channel.name == channel,
  );

  console.log('userIsMemberOfChannel[0]', userIsMemberOfChannel);

  return (
    <React.Fragment>
      {channelState && userIsMemberOfChannel[0]?.channel?.name === channel ? (
        <React.Fragment>
          <LogoutButton />
          <OnlineUser username={username} user_id={user_id} />
          <hr></hr>
          <Chat username={username} user_id={user_id} />
          <ChatInput username={username} user_id={user_id} />
        </React.Fragment>
      ) : (
        'you have no membership for this channel'
      )}
    </React.Fragment>
  );
};

export default ChatApp;
