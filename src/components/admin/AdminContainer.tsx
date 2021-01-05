import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { theme } from '../../theme/theme';
import { Box, Divider, Grid, Typography } from '@material-ui/core/';
import useMediaQuery from '@material-ui/core/useMediaQuery';
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
    padding: theme.spacing(2),
    paddingTop: theme.spacing(0),
    paddingRight: theme.spacing(0),
  },
  article: {
    padding: theme.spacing(2),
    paddingTop: theme.spacing(8),
  },
}));

const AdminContainer: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <Grid item xs={12} md={9} component="section" className={classes.root}>
        <MobileHeaderDashboardMenu channelName="Dashboard" />
        <Box component="article" className={classes.article}>
          <Typography color="primary" variant="h1">
            Admin Dashboard
          </Typography>
          <Divider />
          <Switch>
            <Route exact path="/dashboard/users" component={AdminUserList} />
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
  );
};

export default AdminContainer;
