import React from 'react';
import ChatApp from './components/ChatApp';
import NotFound from './components/NotFound';
import LoginButton from './components/LoginButton';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import Loading from './components/Loading';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import { useRecoilState } from 'recoil';
import { recoilUserState } from './atom.js';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from './components/LogoutButton';

const App: React.FC = (client) => {
  const [userState, setUserState] = useRecoilState<any>(recoilUserState);

  const { isAuthenticated, isLoading, user } = useAuth0();

  if (isLoading) {
    return (
      <React.Fragment>
        <Loading />
      </React.Fragment>
    );
  }

  console.log('ia', isAuthenticated);
  console.log('user App ', user);

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
