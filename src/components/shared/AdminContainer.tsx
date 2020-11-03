import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { theme } from '../../theme/theme';
import { Container, Divider, Grid, Typography } from '@material-ui/core/';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AdminSidebar from './AdminSidebar';
import AdminUserList from '../admin/AdminUserList';
import AdminPollings from '../adminPollings';
import PollQuestions from '../adminPollings/PollQuestions';
import NotFound from './NotFound';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'flex-start',
    flexGrow: 1,
    height: '100vh',
    marginTop: theme.spacing(0),
    paddingBottom: theme.spacing(0),
  },
  container: {
    margin: theme.spacing(5),
    marginTop: theme.spacing(5),
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
}));

const AdminContainer: React.FC = () => {
  const classes = useStyles();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <Container
      component="main"
      maxWidth="xl"
      disableGutters
      className={classes.root}
    >
      {matches === true && (
        <Grid item xs={4} className={classes.sidebar}>
          <AdminSidebar />
        </Grid>
      )}
      <Grid item xs={12} md={8} className={classes.container}>
        <Typography color="primary" variant="h1">
          Admin Dashboard
        </Typography>
        <Divider />
        <Switch>
          <Route exact path="/dashboard/users" component={AdminUserList} />
          <Route exact path="/dashboard/pollings" component={AdminPollings} />
          <Route exact path="/dashboard/pollings" component={AdminPollings} />
          <Route
            exact
            path="/dashboard/pollings/edit/question/:question"
            component={PollQuestions}
          />
          <Route component={NotFound} />
        </Switch>
      </Grid>
    </Container>
  );
};

export default AdminContainer;
