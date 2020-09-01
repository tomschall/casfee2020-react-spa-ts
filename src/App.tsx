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
      user_id: user.data.user[0].auth0_user_id,
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
              <option value="google-oauth2|107013031871730450250">tom</option>
              <option value="google-oauth2|107013031871730454567">roli</option>
              <option value="google-oauth2|107013031871730485763">
                hasura
              </option>
              <option value="google-oauth2|107013031871730582945">
                kimibimi
              </option>
              <option value="google-oauth2|107013031871730967352">kim</option>
            </select>
            <input type="submit" value="Submit" />
          </form>
        </React.Fragment>
      )}
    </div>
  );
};

export default App;
