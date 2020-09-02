import React, { useState, useEffect } from 'react';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import ChatApp from './components/ChatApp';
import NotFound from './components/NotFound';
import LoginButton from './components/LoginButton';
import Header from './components/Header';
import { useApolloClient } from '@apollo/react-hooks';
import { useRecoilState } from 'recoil';
import { recoilUserState } from './atom.js';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

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

  const { isAuthenticated, loginWithRedirect } = useAuth0();

  const client = useApolloClient();

  const setUser = async () => {
    if (!isAuthenticated) return;

    const getUserFromToken = (token: any) => {
      if (token) {
        try {
          return JSON.parse(atob(token.split('.')[1]));
        } catch (error) {
          // ignore
        }
      }
      return null;
    };

    const userFromTokenObj = getUserFromToken(localStorage.getItem('token'));
    const userFromToken =
      userFromTokenObj['https://hasura.io/jwt/claims']['x-hasura-user-id'];
    console.log(
      'userfromtoken',
      userFromTokenObj['https://hasura.io/jwt/claims']['x-hasura-user-id'],
    );

    const user = await client.query({
      query: USER,
      variables: {
        user_id: userFromToken ? userFromToken : '',
      },
    });

    const userState = {
      isLoggedIn: true,
      username: user.data.user[0].username,
      user_id: user.data.user[0].auth0_user_id,
      user_channels: user.data.user[0].user_channels,
    };
    console.log('user', user);
    setUserState(userState);
  };

  useEffect(() => {
    if (isAuthenticated) setUser();
  }, [isAuthenticated]);

  console.log('ia', isAuthenticated);

  return (
    <div className="app">
      {isAuthenticated && localStorage.getItem('token') !== '' ? (
        <React.Fragment>
          <Header />
          <Switch>
            <Route
              exact
              path="/:channel"
              render={(props) => (
                <ChatApp
                  {...props}
                  username={userState.username}
                  user_id={userState.user_id}
                  userState={userState}
                />
              )}
            />
            <Redirect from="/" exact to="/general" />
            <Route exact path="/not-found" render={(props) => <NotFound />} />
            <Redirect to="/not-found" />
          </Switch>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <LoginButton />
        </React.Fragment>
      )}
    </div>
  );
};

export default App;
