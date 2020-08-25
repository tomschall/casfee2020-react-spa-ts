import React, { useState } from 'react';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import ChatApp from './components/ChatApp';
import { useApolloClient } from '@apollo/react-hooks';
import { useRecoilState } from 'recoil';
import { userState } from './atom.js';

const USER = gql`
  query($userId: Int!) {
    user(where: { id: { _eq: $userId } }) {
      id
      username
    }
  }
`;

const App: React.FC = () => {
  const [inputValue, setInputValue] = useState<any>();
  const [state, setState] = useRecoilState<any>(userState);

  const client = useApolloClient();

  const handleNameChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const handleNameSubmit = async (event: any) => {
    event.preventDefault();
    const user = await client.query({
      query: USER,
      variables: {
        userId: inputValue,
      },
    });
    const state = {
      isLoggedIn: true,
      username: user.data.user[0].username,
      userId: user.data.user[0].id,
    };
    setState(state);
  };

  return (
    <div className="app">
      {state.isLoggedIn ? (
        <ApolloConsumer>
          {(client) => {
            return (
              <ChatApp
                client={client}
                username={state.username}
                userId={state.userId}
              />
            );
          }}
        </ApolloConsumer>
      ) : (
        <React.Fragment>
          <form onSubmit={handleNameSubmit}>
            <label>Name:</label>
            <select value={inputValue} onChange={handleNameChange}>
              <option>select name</option>
              <option value="1">tom</option>
              <option value="3">roli</option>
              <option value="15">hasura</option>
              <option value="4">kimibimi</option>
            </select>
            <input type="submit" value="Submit" />
          </form>
        </React.Fragment>
      )}
    </div>
  );
};

export default App;
