import React from 'react';
import { Box, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(0),
    width: '100%',
    height: '100vh',
  },
}));

const Loader = () => {
  const classes = useStyles();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      // style={{ height: '100%' }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loader;
