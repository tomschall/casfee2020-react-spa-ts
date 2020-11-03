import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
    [theme.breakpoints.up('md')]: {
      width: '100%',
    },
    marginTop: theme.spacing(3),
  },
}));

const Logout: React.FC = () => {
  const classes = useStyles();
  const { logout } = useAuth0();

  return (
    <>
      <Button
        variant="outlined"
        color="secondary"
        size="small"
        className={classes.button}
        endIcon={<ExitToAppIcon />}
        onClick={() => {
          logout({
            returnTo: process.env.REACT_APP_AUTH0_LOGOUT_URL,
          });
          window.localStorage.clear();
        }}
      >
        Logout
      </Button>
    </>
  );
};

export default Logout;
