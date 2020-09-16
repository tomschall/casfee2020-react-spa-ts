import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AddChannel from './components/sidebar/AddChannel';
import ChatApp from './components/ChatApp';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Loading from './components/Loading';
import LogoutButton from './components/LogoutButton';
import NotFound from './components/NotFound';
import OnlineUsers from './components/OnlineUsers';
import OnlineUser from './components/OnlineUser';
import PrivateRoute from './components/PrivateRoute';
import Sidebar from './components/sidebar/Sidebar';

// MUI STYLES
const useStyles = makeStyles((theme) => ({
  '@global': {
    '*::-webkit-scrollbar': {
      width: '1em',
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
    },
  },
  root: {
    flexGrow: 1,
    margin: theme.spacing(0),
    backgroundColor: '#2b0d3b',
    height: '100vh',
    color: 'white',
    overflowX: 'hidden',
  },
  sidebar: {
    marginTop: theme.spacing(5),
    backgroundColor: '#2b0d3b',
  },

  logo: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const App: React.FC = (client) => {
  const { isAuthenticated, isLoading, user } = useAuth0();

  const classes = useStyles();

  if (isLoading) {
    return (
      <React.Fragment>
        <Loading />
      </React.Fragment>
    );
  }

  return (
    <div className="app">
      <div className={classes.root}>
        {isAuthenticated ? (
          <Grid container spacing={3} className={classes.root}>
            <Grid item className={classes.sidebar} xs={2}>
              <div className={classes.logo}>
                <img src="/logo-chicken-chat.png" alt="Chicken Chat" />
              </div>
              <OnlineUsers user_id={user.id} />
              <LogoutButton />
              <AddChannel />
              <Sidebar />
            </Grid>
            <Switch>
              <Redirect exact from="/" to="/channel/general" />
              <Redirect exact from="/channel" to="/channel/general" />
              <PrivateRoute path="/channel/:channel" component={ChatApp} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
              <Route exact path="/not-found" render={(props) => NotFound} />
              <Redirect to="/not-found" />
            </Switch>
          </Grid>
        ) : (
          <Switch>
            <Redirect exact from="/" to="/home" />
            <Route path="/home" component={Home} />
            <PrivateRoute path="/channel/:channel" component={ChatApp} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <Route exact path="/not-found" render={(props) => NotFound} />
            <Redirect to="/not-found" />
          </Switch>
        )}
      </div>
    </div>
  );
};

export default App;
