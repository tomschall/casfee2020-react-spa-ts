import React from 'react';
import { CircularProgress } from '@material-ui/core';
import useStyles from './styles';

const Loader = () => {
  const classes = useStyles();

  return (
    <div className={classes.root} data-testid="loader">
      <CircularProgress />
    </div>
  );
};

export default Loader;
