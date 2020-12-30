import React from 'react';
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  large: {
    backgroundSize: 'cover',
    marginTop: theme.spacing(2),
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}));

const Logo = () => {
  const classes = useStyles();

  return (
    <Avatar
      className={classes.large}
      alt="Chicken Fest"
      src="/chicken-chat-logo.svg"
    />
  );
};

export default Logo;
