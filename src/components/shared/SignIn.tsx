import React from 'react';
import { Box, Container, Grid, Typography } from '@material-ui/core';
import Login from '../Login';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100vh',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    paddingTop: theme.spacing(5),
  },
}));

const SignIn: React.FC = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="lg">
      <Grid container className={classes.root}>
        <Grid item>
          <Box display="flex" justifyContent="center" alignItems="center">
            <img src="/logo-chicken-chat.png" alt="Chicken Chat" />
          </Box>
          <Typography className={classes.title} variant="h2">
            Welcome to Chicken Chat
          </Typography>
          <Typography color="textPrimary" variant="body1">
            Please register or login. Lets go an cackle your nonsense!
          </Typography>
        </Grid>
        <Grid item>
          <Login />
        </Grid>
      </Grid>
    </Container>
  );
};

export default SignIn;
