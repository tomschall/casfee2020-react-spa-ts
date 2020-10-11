import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { theme } from '../../../theme/theme';
import { Container, Divider, Grid, Typography } from '@material-ui/core/';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useStyles from './styles';
import AdminSidebar from '../../shared/AdminSidebar';
import AdminUserList from '../../../components/AdminUserList';
import AdminPollings from '../../../components/AdminPollings';
import PollQuestions from '../../../components/AdminPollings/PollQuestions';
import NotFound from '../NotFound';

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
        <Typography variant="h1">Admin Dashboard</Typography>
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
