import React, { useState, useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';
import Chat from './Chat';
import ChatInput from './ChatInput';
import OnlineUser from './OnlineUser';
import { useRecoilState } from 'recoil';
import { atomChannelState, recoilUserState } from '../atom.js';
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

const ChatApp: React.FC = () => {
  const [channelState, setChannel] = useRecoilState<any>(atomChannelState);
  const [userState, setUserState] = useRecoilState<any>(recoilUserState);

  let { channel } = useParams();

  const username = userState.username;
  const user_id = userState.user_id;

  const client = useApolloClient();

  useEffect(() => {
    console.log('ChickenFestChat did mount');
    const interval = setInterval(async () => {
      client.mutate({
        mutation: USER_IS_ONLINE,
        variables: { user_id },
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

  const userIsMemberOfChannel = userState.user_channels?.filter(
    (e: any) => e.channel.name == channel,
  );

  return (
    <React.Fragment>
      {channelState &&
      userIsMemberOfChannel &&
      userIsMemberOfChannel[0]?.channel?.name === channel ? (
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
