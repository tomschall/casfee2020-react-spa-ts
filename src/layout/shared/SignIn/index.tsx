import React from 'react';
import useStyles from './styles';
import { Box, Container, Grid, Typography } from '@material-ui/core';
import Login from '../../../components/Login';

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
