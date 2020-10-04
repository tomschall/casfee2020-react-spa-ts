import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Route, Switch, Redirect } from 'react-router-dom';
import routes from '../src/routes/routes';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { theme } from './theme/theme';
import { Box } from '@material-ui/core';

import SignIn from './layout/shared/SignIn';
import Loader from './layout/shared/Loader';
import NotFound from './layout/shared/NotFound';
import PrivateRoute from './components/PrivateRoute';
import AddChannelMembers from './layout/AddChannelMembers';
import AddDirectMessageChannel from './components/AddDirectMessageChannel';
import ChatBoard from './layout/ChatBoard';
import AdminBoard from './layout/AdminBoard';

const App: React.FC = (client) => {
  const { isAuthenticated, user, isLoading } = useAuth0();
  if (isLoading) {
    return (
      <>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          style={{
            height: '100vh',
            backgroundColor: theme.palette.background.default,
          }}
        >
          <Loader />
        </Box>
      </>
    );
  }

  if (isAuthenticated) console.log('user.id', user.sub);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
            <PrivateRoute path="/add-user-to-channel" component={ChatBoard} />
            <PrivateRoute
              path="/addChannelMembers"
              component={AddChannelMembers}
            />
            <PrivateRoute
              path="/addDirectMessageChannelMembers"
              component={AddDirectMessageChannel}
            />
            <PrivateRoute
              path={routes.signed.dashboard}
              component={AdminBoard}
            />
            <Route exact path={routes.notfound} component={NotFound} />
            <Redirect to={routes.notfound} />
          </Switch>
        ) : (
          <Switch>
            <Redirect exact from={routes.base} to={routes.unsigned.home} />
            <Route path={routes.unsigned.home} component={SignIn} />
            <PrivateRoute
              path={routes.unsigned.dynamic}
              component={ChatBoard}
            />
            <PrivateRoute
              path={routes.signed.dashboard}
              component={AdminBoard}
            />
            <Route exact path={routes.notfound} component={NotFound} />
            <Redirect to={routes.notfound} />
          </Switch>
        )}
      </div>
    </ThemeProvider>
  );
};

export default App;
