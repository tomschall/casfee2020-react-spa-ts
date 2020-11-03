import React from 'react';
import { Avatar } from '@material-ui/core';
import useStyles from './styles';

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
