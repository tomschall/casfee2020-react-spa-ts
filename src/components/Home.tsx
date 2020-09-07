import React from 'react';
import LoginButton from './LoginButton';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100vh',
    component: 'container',
    backgroundColor: '#2b0d3b',
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
  logo: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const Home: React.FC = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item>
        <div className={classes.logo}>
          <img src="/logo-chicken-chat.png" alt="Chicken Chat" />
        </div>
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
