import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import AddChannel from './components/sidebar/AddChannel';
import AddDirectMessageChannel from './components/sidebar/AddDirectMessageChannel';
import ChatApp from './components/ChatApp';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Loading from './components/Loading';
import LogoutButton from './components/LogoutButton';
import NotFound from './components/NotFound';
import OnlineUsers from './components/OnlineUsers';
import PrivateRoute from './components/PrivateRoute';
import ChannelList from './components/sidebar/ChannelList';
import UserList from './components/sidebar/UserList';
import ChatBoard from './layout/chat';

const App: React.FC = (client) => {
  const { isAuthenticated, isLoading, user } = useAuth0();

  console.log(user);

  if (isLoading) {
    return (
      <React.Fragment>
        <Loading />
      </React.Fragment>
    );
  }

  if (isAuthenticated) console.log('user.id', user.id);

  return (
    <div className="app">
      {isAuthenticated ? (
        <Switch>
          <Redirect exact from="/" to="/channel/general" />
          <Redirect exact from="/channel" to="/channel/general" />
          <PrivateRoute path="/channel/:channel" component={ChatBoard} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <Route exact path="/not-found" render={(props) => NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      ) : (
        <Switch>
          <Redirect exact from="/" to="/home" />
          <Route path="/home" component={Home} />
          <PrivateRoute path="/channel/:channel" component={ChatBoard} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <Route exact path="/not-found" render={(props) => NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      )}
    </div>
  );
};

export default App;
