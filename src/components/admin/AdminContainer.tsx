import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { theme } from '../../theme/theme';
import { Box, Container, Divider, Grid, Typography } from '@material-ui/core/';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AdminSidebar from './AdminSidebar';
import AdminUserList from './AdminUserList';
import PollingDashBoard from '../adminPollings/PollingDashBoard';
import PollAnswers from '../adminPollings/PollAnswers';
import NotFound from '../shared/NotFound';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    overflowY: 'scroll',
    maxHeight: '90vh',
    height: '90vh',
  },
  sidebar: {
    height: '100vh',
    maxHeight: '100vh',
    display: 'flex',
    alignItems: 'flex-start',
    marginTop: theme.spacing(0),
    paddingTop: theme.spacing(5),
    borderRightWidth: 1,
    borderRightStyle: 'solid',
    borderRightColor: theme.palette.primary.dark,
  },
  chatApp: {
    height: '100vh',
    overflowY: 'hidden',
  },
}));

const AdminContainer: React.FC = () => {
  const classes = useStyles();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <Grid item xs={12} md={9} className={classes.chatApp} component="section">
      <Box className={classes.root} component="article">
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
  );
};

export default AdminContainer;
