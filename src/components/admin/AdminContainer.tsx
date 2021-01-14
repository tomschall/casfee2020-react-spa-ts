import React from 'react';
import { theme } from '../../theme/theme';
import { useAuth0 } from '@auth0/auth0-react';
import { Route, Switch } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import { Box, Grid, Typography } from '@material-ui/core/';
import AdminUserList from './AdminUserList';
import PollingDashBoard from '../adminPollings/PollingDashBoard';
import PollAnswers from '../adminPollings/PollAnswers';
import NotFound from '../shared/NotFound';
import MobileHeaderDashboardMenu from '../adminPollings/MobileHeaderDashboardMenu';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    overflowY: 'scroll',
    maxHeight: '100vh',
    height: '100vh',
    padding: theme.spacing(0),
  },
  article: {
    padding: theme.spacing(0),
    paddingTop: theme.spacing(8),
  },
}));

const AdminContainer: React.FC = () => {
  const classes = useStyles();
  const { user, isAuthenticated } = useAuth0();
  const role = sessionStorage.getItem(user.sub);

  return (
    <>
      {isAuthenticated && role === 'admin' ? (
        <>
          <Grid
            item
            xs={12}
            md={9}
            component="section"
            className={classes.root}
          >
            <MobileHeaderDashboardMenu channelName="Dashboard" />
            <Box component="article" className={classes.article}>
              <Switch>
                <Route
                  exact
                  path="/dashboard/users"
                  component={AdminUserList}
                />
                <Route exact path="/dashboard" component={PollingDashBoard} />
                <Route
                  exact
                  path="/dashboard/pollings"
                  component={PollingDashBoard}
                />
                <Route
                  exact
                  path="/dashboard/pollings/edit/question/:question"
                  component={PollAnswers}
                />
                <Route component={NotFound} />
              </Switch>
            </Box>
          </Grid>
        </>
      ) : (
        <Grid item xs={12} md={9} component="section" className={classes.root}>
          <MobileHeaderDashboardMenu channelName="No permission!" />
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            style={{ height: '100vh', padding: theme.spacing(5) }}
          >
            <Alert severity="info">
              You have no permission to access this page! If you still need
              access, contact our administrator.
            </Alert>
          </Box>
        </Grid>
      )}
    </>
  );
};

export default AdminContainer;
