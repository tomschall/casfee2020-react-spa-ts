import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import Chat from './Chat';
import ChatInput from './ChatInput';
import OnlineUser from './OnlineUser';
import { useRecoilState } from 'recoil';
import { atomChannelState } from '../atom.js';
import { useParams } from 'react-router';

const USER_IS_ONLINE = gql`
  mutation($user_id: Int!) {
    update_user(
      _set: { last_seen: "now()" }
      where: { id: { _eq: $user_id } }
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
  client: any;
  username: string;
  user_id: number;
  userState: any;
}

const ChatApp: React.FC<ChatAppProps> = ({
  client,
  username,
  user_id,
  userState,
}) => {
  const [channelState, setChannel] = useRecoilState<any>(atomChannelState);

  let { channel } = useParams();

  useEffect(() => {
    console.log('ChickenFestChat did mount');
    const interval = setInterval(async () => {
      await client.mutate({
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

  const userIsMemberOfChannel = userState.user_channels?.filter(
    (e: any) => e.channel.name == channel,
  );

  return (
    <React.Fragment>
      {channelState && userIsMemberOfChannel.length ? (
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
