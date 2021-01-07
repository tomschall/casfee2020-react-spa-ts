import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { theme } from './theme/theme';
import {
  Box,
  Container,
  Grid,
  makeStyles,
  useMediaQuery,
} from '@material-ui/core';
import SignIn from './components/shared/SignIn';
import LinearProgress from '@material-ui/core/LinearProgress';
import NotFound from './components/shared/NotFound';
import PrivateRoute from './components/PrivateRoute';
import AddChannelMembers from './components/chat/AddChannelMembers';
import AddDirectMessageChannel from './components/chat/AddDirectMessageChannel';
import ThreadBoard from './components/layout/ThreadBoard';
import ChatBoard from './components/layout/ChatBoard';
import AdminBoard from './components/layout/AdminBoard';
import Logo from './components/shared/Logo';
import SideBar from './components/shared/SideBar';

const useStyles = makeStyles((theme) => ({
  container: {
    // overflowY: 'scroll',
    maxHeight: '100vh',
    margin: 0,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    overflowX: 'hidden',
    height: '100vh',
    [theme.breakpoints.down('md')]: {
      overflowY: 'hidden',
    },
  },
  sidebar: {
    overflowY: 'hidden',
    minHeight: '50vh',
    display: 'flex',
    alignItems: 'flex-start',
  },
}));

const App: React.FC = () => {
  const { isAuthenticated, isLoading, user } = useAuth0();
  const classes = useStyles();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  if (isLoading) {
    return (
      <>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          style={{
            height: '100vh',
            backgroundColor: theme.palette.error.dark,
          }}
        >
          <Box>
            <Logo />
            <LinearProgress color="primary" style={{ marginTop: '16px' }} />
          </Box>
        </Box>
      </>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        component="main"
        disableGutters
        maxWidth="xl"
        className={classes.container}
      >
        {matches === true && (
          <Grid
            item
            xs={5}
            sm={4}
            md={3}
            className={classes.sidebar}
            component="nav"
          >
            <SideBar handleDrawerClose={() => false} open={false} />
          </Grid>
        )}
        <>
          {isAuthenticated ? (
            <Switch>
              <Redirect exact from="/" to="/channel/general" />
              <Redirect exact from="/channel" to="/channel/general" />

              <PrivateRoute
                path="/channel/:channel/thread/:messageId"
                component={ThreadBoard}
              />
              <PrivateRoute path="/channel/threads" component={ThreadBoard} />
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
              <PrivateRoute path="/channel/threads" component={ThreadBoard} />
              <PrivateRoute path="/channel/:channel" component={ChatBoard} />
              <PrivateRoute path="/dashboard" component={AdminBoard} />
              <Route exact path="/404-not-found" component={NotFound} />
              <Redirect to="/404-not-found" />
            </Switch>
          )}
        </>
      </Container>
    </ThemeProvider>
  );
};

export default App;
