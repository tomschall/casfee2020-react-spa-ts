import React from 'react';

import { theme } from '../../../theme/theme';
import { Container, Divider, Grid } from '@material-ui/core/';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useStyles from './styles';

import AdminSidebar from '../../shared/AdminSidebar';

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
        <Grid item xs={5} className={classes.sidebar}>
          <AdminSidebar />
        </Grid>
      )}
      <Grid item xs={12} className={classes.container}>
        <h1>Admin Dashboard</h1>
        <Divider />
      </Grid>
    </Container>
  );
};

export default AdminContainer;
