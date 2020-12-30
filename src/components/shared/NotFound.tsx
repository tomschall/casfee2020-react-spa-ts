import React from 'react';
import { Box } from '@material-ui/core';
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
    <Box className={classes.root}>
      <h2>Upppsss ....! Something went wrong!</h2>
    </Box>
  );
};

export default NotFound;
