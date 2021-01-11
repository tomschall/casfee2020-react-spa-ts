import React from 'react';
import { Box, Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Login from '../Login';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100vh',
    alignContent: 'center',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    paddingTop: theme.spacing(5),
  },
  text: {
    justifyContent: 'center',
    marginBottom: '30px',
  },
}));

const SignIn: React.FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box>
        <img src="/logo-chicken-chat.png" alt="Chicken Chat" />
      </Box>
      <Box>
        <Typography className={classes.title} variant="h2" align="center">
          Welcome to Chicken Chat
        </Typography>
        <Typography
          className={classes.text}
          color="textPrimary"
          variant="body1"
          align="center"
        >
          Please register or login. Let's go an crackle your nonsense!
        </Typography>
      </Box>
      <Login />
    </Box>
  );
};

export default SignIn;
