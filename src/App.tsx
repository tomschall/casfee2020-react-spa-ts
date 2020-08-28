import React, { useState } from 'react';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import ChatApp from './components/ChatApp';
import NotFound from './components/NotFound';
import Header from './components/Header';
import { useApolloClient } from '@apollo/react-hooks';
import { useRecoilState } from 'recoil';
import { recoilUserState } from './atom.js';
import { Route, Switch, Redirect } from 'react-router-dom';

const USER = gql`
  query($user_id: Int!) {
    user(where: { id: { _eq: $user_id } }) {
      id
      username
      user_channels {
        channel_id
        channel {
          name
          is_private
          messages {
            id
          }
        }
      }
    }
  }
`;

const App: React.FC = () => {
  const [inputValue, setInputValue] = useState<any>();
  const [userState, setUserState] = useRecoilState<any>(recoilUserState);

  const client = useApolloClient();

  const handleNameChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const handleNameSubmit = async (event: any) => {
    event.preventDefault();
    const user = await client.query({
      query: USER,
      variables: {
        user_id: inputValue,
      },
    });
    const userState = {
      isLoggedIn: true,
      username: user.data.user[0].username,
      user_id: user.data.user[0].id,
      user_channels: user.data.user[0].user_channels,
    };
    setUserState(userState);
  };

  return (
    <div className="app">
      {userState.isLoggedIn ? (
        <ApolloConsumer>
          {(client) => {
            return (
              <React.Fragment>
                <Header />
                <Switch>
                  <Route
                    exact
                    path="/:channel"
                    render={(props) => (
                      <ChatApp
                        {...props}
                        client={client}
                        username={userState.username}
                        user_id={userState.user_id}
                        userState={userState}
                      />
                    )}
                  />
                  <Redirect from="/" exact to="/casfee20" />
                  <Route
                    exact
                    path="/not-found"
                    render={(props) => <NotFound />}
                  />
                  <Redirect to="/not-found" />
                </Switch>
              </React.Fragment>
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
              <option value="6">kim</option>
            </select>
            <input type="submit" value="Submit" />
          </form>
        </React.Fragment>
      )}
    </div>
  );
};

export default App;
