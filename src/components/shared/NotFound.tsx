import React from 'react';
import { Box, Grid } from '@material-ui/core';
import { theme } from '../../theme/theme';
import MobileHeaderDashboardMenu from '../../components/admin/MobileHeaderDashboardMenu';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {},
  toolbarIcon: {
    ...theme.mixins.toolbar,
  },
}));

const NotFound: React.FC = () => {
  const classes = useStyles();

  return (
    <Grid item xs={12} md={9} component="section" className={classes.root}>
      <MobileHeaderDashboardMenu channelName="Page not found!" />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        style={{ height: '100vh', padding: theme.spacing(3) }}
      >
        <Alert severity="warning">Ups! Page not found!</Alert>
      </Box>
    </Grid>
  );
};

export default NotFound;
