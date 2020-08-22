import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import Chat from './Chat';
import ChatInput from './ChatInput';
import OnlineUser from './OnlineUser';

const USER_IS_ONLINE = gql`
  mutation($userId: Int!) {
    update_user(_set: { last_seen: "now()" }, where: { id: { _eq: $userId } }) {
      affected_rows
    }
  }
`;

interface ChatAppProps {
  client: any;
  username: string;
  userId: number;
}

const ChatApp: React.FC<ChatAppProps> = ({ client, username, userId }) => {
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

    return function cleanup() {
      console.log('ChickenFestChat did unmount');
      clearInterval(interval);
    };
  }, []);

  return (
    <React.Fragment>
      <OnlineUser username={username} userId={userId} />
      <hr></hr>
      <Chat />
      <ChatInput username={username} userId={userId} />
    </React.Fragment>
  );
};

export default ChatApp;
