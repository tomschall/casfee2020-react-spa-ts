import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Route, Switch, Redirect } from 'react-router-dom';
import routes from '../src/routes/routes';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Loader from './layout/shared/Loader';
import NotFound from './components/NotFound';
import PrivateRoute from './components/PrivateRoute';
import ChatBoard from './layout/chat';
import { theme } from './theme/theme';
import ChatApp from './components/ChatApp';
import Loading from './components/Loading';

const App: React.FC = (client) => {
  const { isAuthenticated, user, isLoading } = useAuth0();

  console.log(user);

  if (isLoading) {
    return (
      <React.Fragment>
        <Loading />
      </React.Fragment>
    );
  }

  if (isAuthenticated) console.log('user.id', user.sub);

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
