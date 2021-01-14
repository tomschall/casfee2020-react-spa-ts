import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Login from '../Login';
import Logo from '../shared/Logo';
import { useAuth0 } from '@auth0/auth0-react';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100vh',
    alignContent: 'center',
    padding: theme.spacing(2),
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
  const { isAuthenticated } = useAuth0();
  let history = useHistory();

  if (isAuthenticated) history.push(`/channel/general`);

  return (
    <Box className={classes.root}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Logo />
        <Typography color="secondary" variant="h1" align="center">
          Welcome to Chicken Chat
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" mb={3}>
        <Typography color="textPrimary" variant="body1" align="center">
          Please register or login. Let's go an crackle your nonsense!
        </Typography>
      </Box>
      <Login />
    </Box>
  );
};

export default SignIn;
