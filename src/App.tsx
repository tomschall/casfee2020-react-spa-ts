import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { theme } from './theme/theme';
import { Box } from '@material-ui/core';
import SignIn from './components/shared/SignIn';
import Loader from './components/shared/Loader';
import NotFound from './components/shared/NotFound';
import PrivateRoute from './components/PrivateRoute';
import AddChannelMembers from './components/chat/AddChannelMembers';
import AddDirectMessageChannel from './components/chat/AddDirectMessageChannel';
import ThreadBoard from './components/layout/ThreadBoard';
import ChatBoard from './components/layout/ChatBoard';
import AdminBoard from './components/layout/AdminBoard';

const App: React.FC = () => {
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

  if (isAuthenticated) {
    console.log('user.id', user.sub);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
        {isAuthenticated ? (
          <Switch>
            <Redirect exact from="/" to="/channel/general" />
            <Redirect exact from="/channel" to="/channel/general" />
            <PrivateRoute
              path="/channel/:channel/thread/:messageId"
              component={ThreadBoard}
            />
            <PrivateRoute path="/channel/:channel" component={ChatBoard} />

            <PrivateRoute path="/add-user-to-channel" component={ChatBoard} />
            <PrivateRoute
              path="/addChannelMembers"
              component={AddChannelMembers}
            />
            <PrivateRoute
              path="/addDirectMessageChannelMembers"
              component={AddDirectMessageChannel}
            />

            <PrivateRoute path="/dashboard" component={AdminBoard} />
            <Route exact path="/404-not-found" component={NotFound} />
            <Redirect to="/404-not-found" />
          </Switch>
        ) : (
          <Switch>
            <Redirect exact from="/" to="/channel/general" />
            <Route path="/home" component={SignIn} />
            <PrivateRoute
              path="/channel/:channel/thread/:messageId"
              component={ThreadBoard}
            />
            <PrivateRoute path="/channel/:channel" component={ChatBoard} />

            <PrivateRoute path="/dashboard" component={AdminBoard} />
            <Route exact path="/404-not-found" component={NotFound} />
            <Redirect to="/404-not-found" />
          </Switch>
        )}
      </div>
    </ThemeProvider>
  );
};

export default App;
