import React from 'react';
import { Avatar } from '@material-ui/core';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import useStyles from './styles';

const ChannelMembers: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AvatarGroup max={3}>
        <Avatar alt="Remy Sharp" src="/chicken-chat-logo.svg" />
        <Avatar alt="Remy Sharp" src="/chicken-chat-logo.svg" />
        <Avatar alt="Remy Sharp" src="/chicken-chat-logo.svg" />
        <Avatar alt="Remy Sharp" src="/chicken-chat-logo.svg" />
      </AvatarGroup>{' '}
    </div>
  );
};

export default ChannelMembers;
