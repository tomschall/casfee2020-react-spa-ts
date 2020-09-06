import React, { useState, useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';
import Chat from './Chat';
import ChatInput from './ChatInput';
import OnlineUser from './OnlineUser';
import IsOnline from './IsOnline';
import { useRecoilState } from 'recoil';
import { atomChannelState, recoilUserState } from '../atom.js';
import { useParams } from 'react-router';
import LogoutButton from './LogoutButton';
import { useApolloClient, useQuery, ApolloConsumer } from 'react-apollo';
import { useAuth0 } from '@auth0/auth0-react';
import { isUndefined } from 'util';

const ROOM = gql`
  query {
    channel {
      name
      id
    }
  }
`;

const USER = gql`
  query($user_id: String) {
    user(where: { auth0_user_id: { _eq: $user_id } }) {
      id
      username
      auth0_user_id
      user_channels {
        channel_id
        channel {
          name
          messages {
            id
          }
        }
      }
    }
  }
`;

const ChatApp: React.FC = (props) => {
  const [channelState, setChannel] = useRecoilState<any>(atomChannelState);
  const [userState, setUserState] = useRecoilState<any>(recoilUserState);
  const { isAuthenticated, isLoading, user } = useAuth0();

  let { channel } = useParams();

  const { data, error, loading, client } = useQuery(USER, {
    variables: {
      user_id: user?.sub,
    },
  });

  const channelObj = useQuery(ROOM);

  if (
    channelObj &&
    channelObj.data &&
    channelObj.data.channel &&
    !channelState
  ) {
    setChannel(channelObj.data.channel);
  }

  if (isAuthenticated && data && !isLoading && !userState.user_id) {
    let vars = {
      isLoggedIn: true,
      username: data.user[0].username,
      user_id: data.user[0].auth0_user_id,
      user_channels: data.user[0].user_channels,
    };

    setUserState(vars);
  }

  const username = userState.username;
  const user_id = userState.user_id;

  const userIsMemberOfChannel = userState.user_channels?.filter(
    (e: any) => e.channel.name == channel,
  );

  if (error) return <React.Fragment>Error: {error}</React.Fragment>;

  return (
    <React.Fragment>
      {isAuthenticated &&
      channelState &&
      userIsMemberOfChannel &&
      userIsMemberOfChannel[0]?.channel?.name === channel ? (
        <React.Fragment>
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
