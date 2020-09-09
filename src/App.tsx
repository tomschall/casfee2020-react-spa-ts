import React from 'react';
import ChatApp from './components/ChatApp';
import NotFound from './components/NotFound';
import PrivateRoute from './components/PrivateRoute';
import Loading from './components/Loading';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import AddChannel from './components/sidebar/AddChannel';
import OnlineUser from './components/OnlineUser';
import LogoutButton from './components/LogoutButton';
import Sidebar from './components/sidebar/Sidebar';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useRecoilState } from 'recoil';
import { recoilUserState } from './atom';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

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
  const [userState, setUserState] = useRecoilState<any>(recoilUserState);
  const classes = useStyles();

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
      <div className={classes.root}>
        {isAuthenticated ? (
          <Grid container spacing={3} className={classes.root}>
            <Grid item className={classes.sidebar} xs={3}>
              <div className={classes.logo}>
                <img src="/logo-chicken-chat.png" alt="Chicken Chat" />
              </div>
              <OnlineUser
                username={userState.username}
                user_id={userState.user_id}
              />
              <LogoutButton />
              <AddChannel />
              <Sidebar />
            </Grid>
            <React.Fragment>
              <Switch>
                <Redirect exact from="/" to="/channel/general" />
                <PrivateRoute path="/channel/:channel" component={ChatApp} />
                <PrivateRoute path="/dashboard" component={Dashboard} />
              </Switch>
            </React.Fragment>
          </Grid>
        ) : (
          <React.Fragment>
            <Switch>
              <Redirect exact from="/" to="/home" />
              <Route path="/home" component={Home} />
              <Route exact path="/not-found" render={(props) => NotFound} />
              <Redirect to="/not-found" />
            </Switch>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default App;
