import React from 'react';
import { Box, CircularProgress } from '@material-ui/core';
import useStyles from './styles';

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
