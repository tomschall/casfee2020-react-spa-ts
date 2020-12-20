import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { IconButton } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    [theme.breakpoints.down('md')]: {
      // width: '100%',
    },
    [theme.breakpoints.up('md')]: {
      // width: 'auto',
    },
  },
}));

const Logout: React.FC = () => {
  const classes = useStyles();
  const { logout } = useAuth0();

  return (
    <>
      <IconButton
        color="secondary"
        size="small"
        className={classes.button}
        onClick={() => {
          logout({
            returnTo: process.env.REACT_APP_AUTH0_LOGOUT_URL,
          });
          window.localStorage.clear();
        }}
      >
        <ExitToAppIcon />
      </IconButton>
    </>
  );
};

export default Logout;
