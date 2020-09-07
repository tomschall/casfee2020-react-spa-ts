import React from 'react';
import ChatApp from './components/ChatApp';
import NotFound from './components/NotFound';
import PrivateRoute from './components/PrivateRoute';
import Loading from './components/Loading';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const App: React.FC = (client) => {
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
        <Switch>
          <Redirect exact from="/" to="/home" />
          <Route path="/home" component={Home} />
          <PrivateRoute path="/channel/:channel" component={ChatApp} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <Route exact path="/not-found" render={(props) => NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </React.Fragment>
    </div>
  );
};

export default App;
