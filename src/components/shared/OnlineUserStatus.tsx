import React from 'react';
import { Avatar, Badge, ListItemIcon } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  useWatchOnlineUsersSubscription,
  User,
} from '../../api/generated/graphql';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  badgeOnline: {
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
  badgeOffline: {
    backgroundColor: '#f2115e',
    color: '#f2115e',
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
    backgroundColor: '#000000',
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
    border: '2px solid #f57c00',
  },
}));

interface OnlineUserStatusProps {
  user?: Pick<User, 'auth0_user_id' | 'username'>;
  showBadgeOnly?: boolean;
}

const OnlineUserStatus: React.FC<OnlineUserStatusProps> = ({
  user,
  children,
  showBadgeOnly = false,
}) => {
  const classes = useStyles();

  const {
    data: onlineUsers,
    error: onlineUsersError,
  } = useWatchOnlineUsersSubscription();

  if (onlineUsersError) {
    console.log('OnlineUserStatusError', onlineUsersError);
    return <Alert severity="error">A OnlineUserStatusError occured.</Alert>;
  }

  const setOnlineUsersStatus = (user_id: string | null | undefined) => {
    if (user_id === undefined || user_id === null)
      return { badge: classes.badgeOffline };

    const onlineUser = onlineUsers?.users.filter((u) => {
      return user_id === u.auth0_user_id ? true : false;
    });

    return onlineUser?.length
      ? { badge: classes.badgeOnline }
      : { badge: classes.badgeOffline };
  };

  return (
    <>
      {!showBadgeOnly && user && user.username && (
        <ListItemIcon>
          <Badge
            classes={setOnlineUsersStatus(user.auth0_user_id)}
            variant="dot"
          >
            <Avatar className={classes.avatar}>
              {user.username.substring(0, 2).toUpperCase()}
            </Avatar>
          </Badge>
        </ListItemIcon>
      )}
      {showBadgeOnly && user && user.username && (
        <ListItemIcon>
          <Badge
            classes={setOnlineUsersStatus(user.auth0_user_id)}
            variant="dot"
          >
            <>{children}</>
          </Badge>
        </ListItemIcon>
      )}
    </>
  );
};

export default OnlineUserStatus;
