import React, { useState } from 'react';
import LoginButton from './LoginButton';
import {
  createMuiTheme,
  ThemeProvider,
  makeStyles,
} from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#eb4f34',
    height: '100vh',
    component: 'container',
  },
  title: {
    color: '#fff',
    textTransform: 'uppercase',
  },
  button: {
    color: 'black',
    fontSize: '2rem',
    textAlign: 'center',
  },
}));

const Home: React.FC = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item>
        <Typography className={classes.title} variant="h2">
          Welcome to Chicken Chat
        </Typography>
      </Grid>
      <Grid item className={classes.button}>
        <LoginButton />
      </Grid>
    </Grid>
  );
};

export default Home;
