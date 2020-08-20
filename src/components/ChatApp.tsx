import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import Chat from './Chat';
import ChatInput from './ChatInput';
import OnlineUsers from './OnlineUsers';
import { ApolloClient } from '@apollo/client';

const USER_IS_ONLINE = gql`
  mutation($userId: Int!) {
    update_user(_set: { last_seen: "now()" }, where: { id: { _eq: $userId } }) {
      affected_rows
    }
  }
`;

interface ChatAppProps {
  client: any;
}

const ChatApp: React.FC<ChatAppProps> = ({ client }) => {
  const [nameValue, setNameValue] = useState<any>();

  useEffect(() => {
    console.log('ChickenFestChat did mount');
    const interval = setInterval(async () => {
      await client.mutate({
        mutation: USER_IS_ONLINE,
        variables: {
          userId: 3,
        },
      });
    }, 2000);

    return function cleanup() {
      console.log('ChickenFestChat did unmount');
      clearInterval(interval);
    };
  }, []);

  const handleNameChange = (event: any) => {
    setNameValue(event.target.value);
  };

  const handleNameSubmit = (event: any) => {
    event.preventDefault();
  };

  return (
    <React.Fragment>
      <form onSubmit={handleNameSubmit}>
        <label>
          Name:
          <input type="text" value={nameValue} onChange={handleNameChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <hr></hr>
      <OnlineUsers username={nameValue} userId={1} />
      <hr></hr>
      <Chat client={client} nameValue={nameValue} />
      <ChatInput username={nameValue} userId={1} />
    </React.Fragment>
  );
};

export default ChatApp;
