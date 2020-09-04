import React, { useState, useEffect } from 'react';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import ChatApp from './components/ChatApp';
import NotFound from './components/NotFound';
import LoginButton from './components/LoginButton';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import Loading from './components/Loading';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import { useApolloClient } from '@apollo/react-hooks';
import { useRecoilState } from 'recoil';
import { recoilUserState } from './atom.js';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from './components/LogoutButton';

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
  const { isAuthenticated, loginWithRedirect, isLoading, user } = useAuth0();

  const setUser = async () => {
    const userData = await client.query({
      query: USER,
      variables: {
        user_id: user?.sub,
      },
    });

    const userState = {
      isLoggedIn: true,
      username: userData.data.user[0].username,
      user_id: userData.data.user[0].auth0_user_id,
      user_channels: userData.data.user[0].user_channels,
    };
    console.log('user', user);
    setUserState(userState);
  };

  useEffect(() => {
    console.log('use effect app isLoading', isLoading);
    console.log('use effect app isAuthenticated', isAuthenticated);

    // let should = localStorage.getItem('shouldLoad');
    // let shouldLoad;
    // if (should !== null) shouldLoad = should;

    // console.log('should', shouldLoad);

    // if (shouldLoad === 'true') {
    //   setTimeout(() => {
    //     window.location.reload();
    //   }, 2000);
    //   localStorage.setItem('shouldLoad', 'false');
    // }

    if (isAuthenticated && !isLoading) setUser();
  }, [isAuthenticated, isLoading]);

  if (isLoading) {
    return (
      <React.Fragment>
        <Loading />
      </React.Fragment>
    );
  }

  console.log('ia', isAuthenticated);
  console.log('user', user);

  return (
    <div className="app">
      <React.Fragment>
        {userState.username ? (
          <React.Fragment>'User:' {userState.username}</React.Fragment>
        ) : (
          ''
        )}
        {isAuthenticated && !isLoading ? (
          <React.Fragment>
            <Header />
            <LogoutButton />
          </React.Fragment>
        ) : (
          <LoginButton />
        )}
        <Switch>
          <Redirect exact from="/" to="/home" />
          <Route path="/home" component={Home} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/channel/:channel" component={ChatApp} />
          <Route exact path="/not-found" render={(props) => NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </React.Fragment>
    </div>
  );
};

export default App;
