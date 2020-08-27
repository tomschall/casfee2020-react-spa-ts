import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import Chat from './Chat';
import ChatInput from './ChatInput';
import OnlineUser from './OnlineUser';
import { useParams } from 'react-router';
import { useRecoilState } from 'recoil';
import { atomChannelState } from '../atom.js';

const USER_IS_ONLINE = gql`
  mutation($userId: Int!) {
    update_user(_set: { last_seen: "now()" }, where: { id: { _eq: $userId } }) {
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
  userId: number;
}

const ChatApp: React.FC<ChatAppProps> = ({ client, username, userId }) => {
  const [channelState, setChannel] = useRecoilState<any>(atomChannelState);
  let { channel } = useParams();

  useEffect(() => {
    console.log('ChickenFestChat did mount');
    const interval = setInterval(async () => {
      await client.mutate({
        mutation: USER_IS_ONLINE,
        variables: {
          userId,
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

  return (
    <React.Fragment>
      {channelState ? (
        <React.Fragment>
          <OnlineUser username={username} userId={userId} />
          <hr></hr>
          <Chat username={username} userId={userId} />
          <ChatInput username={username} userId={userId} />
        </React.Fragment>
      ) : (
        ''
      )}
    </React.Fragment>
  );
};

export default ChatApp;
