import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import routes from '../src/routes/routes';
import { useAuth0 } from '@auth0/auth0-react';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Loader from './layout/shared/Loader';
import NotFound from './components/NotFound';
import PrivateRoute from './components/PrivateRoute';
import ChatBoard from './layout/chat';
import { theme } from './theme/theme';

const App: React.FC = (client) => {
  const { isAuthenticated, isLoading, user } = useAuth0();

  console.log(user);

  if (isLoading) {
    return (
      <>
        <div
          style={{
            height: '100vh',
            backgroundColor: theme.palette.background.default,
          }}
        >
          <Loader />
        </div>
      </>
    );
  }

  if (isAuthenticated) console.log('user.id', user.id);

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
