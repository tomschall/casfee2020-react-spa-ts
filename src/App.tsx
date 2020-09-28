import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Route, Switch, Redirect } from 'react-router-dom';
import routes from '../src/routes/routes';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Loader from './layout/shared/Loader';
import NotFound from './components/NotFound';
import PrivateRoute from './components/PrivateRoute';
import AddChannelMembers from './layout/addChannelMembers';
import AddDirectMessageChannel from './components/addDirectMessageChannel';
import ChatBoard from './layout/chatBoard';
import { theme } from './theme/theme';

const App: React.FC = (client) => {
  const { isAuthenticated, user, isLoading } = useAuth0();

  console.log(user);

  if (isLoading) {
    return (
      <>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <Loader />
        </div>
      </>
    );
  }

  if (isAuthenticated) console.log('user.id', user.sub);

  return (
    <div className="app">
      {isAuthenticated ? (
        <Switch>
          <Redirect exact from={routes.base} to={routes.signed.general} />
          <Redirect
            exact
            from={routes.signed.base}
            to={routes.signed.general}
          />
          <PrivateRoute path={routes.signed.dynamic} component={ChatBoard} />
          <PrivateRoute
            path="/addChannelMembers"
            component={AddChannelMembers}
          />
          <PrivateRoute
            path="/addDirectMessageChannelMembers"
            component={AddDirectMessageChannel}
          />
          <PrivateRoute path={routes.signed.dashboard} component={Dashboard} />
          <Route exact path="/not-found" render={(props) => NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      ) : (
        <Switch>
          <Redirect exact from={routes.base} to={routes.unsigned.home} />
          <Route path={routes.unsigned.home} component={Home} />
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
