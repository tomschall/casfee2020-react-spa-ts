import React from 'react';
import { Avatar, Badge, Box, ListItemIcon } from '@material-ui/core';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import { makeStyles } from '@material-ui/core/styles';
import { useWatchOnlineUsersSubscription } from '../../api/generated/graphql';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {},
  toolbarIcon: {
    ...theme.mixins.toolbar,
  },
  badge: {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  avatar: {
    width: 24,
    height: 24,
    backgroundColor: '#ed1859',
    color: 'white',
    fontSize: 10,
  },
}));

interface OnlineUserStatusProps {
  user: any;
}

const OnlineUserStatus: React.FC<OnlineUserStatusProps> = ({ user }) => {
  const classes = useStyles();

  const {
    data: onlineUsers,
    loading: onlineUsersLoading,
    error: onlineUsersError,
  } = useWatchOnlineUsersSubscription();

  if (onlineUsersError) {
    console.log('onlineUsersError', onlineUsersError);
    return (
      <Alert severity="error">A DirectMessageUserListError occured.</Alert>
    );
  }

  const setOnlineUsersStatus = (user_id: string) => {
    if (user_id === undefined) return true;

    const onlineUser = onlineUsers?.users.filter((u) => {
      return user_id === u.auth0_user_id ? true : false;
    });

    return onlineUser?.length ? false : true;
  };

  return (
    <ListItemIcon>
      <Badge
        classes={{ badge: classes.badge }}
        variant="dot"
        invisible={setOnlineUsersStatus(user.auth0_user_id)}
      >
        <Avatar className={classes.avatar}>
          {user.username.substring(0, 2).toUpperCase()}
        </Avatar>
      </Badge>
    </ListItemIcon>
  );
};

export default OnlineUserStatus;
