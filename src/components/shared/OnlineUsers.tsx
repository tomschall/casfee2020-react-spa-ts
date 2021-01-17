import React, { useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useWatchOnlineUsersSubscription } from '../../api/generated/graphql';
import { useSetUserOnlineMutation } from '../../api/generated/graphql';
import { logToConsole } from '../../helpers/helpers';

interface OnlineUsersProps {
  user_id: string;
}

const OnlineUsers: React.FC<OnlineUsersProps> = ({ user_id }) => {
  const { data, loading, error } = useWatchOnlineUsersSubscription();

  const [sendUserIsOnline] = useSetUserOnlineMutation({
    variables: { user_id },
  });

  useEffect(() => {
    setInterval(() => {
      sendUserIsOnline();
    }, 5000);
  }, []);

  if (error) {
    logToConsole('Online users could not be loaded', error);
  }

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <>
      <Typography variant="subtitle1" gutterBottom>
        Online users ({data?.users.length ?? 0})
      </Typography>

      <Divider />

      <List component="nav" aria-label="main mailbox folders">
        {data?.users.map((user) => (
          <ListItem key={user.id} button>
            <ListItemAvatar>
              <Avatar src={'https://api.adorable.io/avatars/face'} />
            </ListItemAvatar>
            <ListItemText primary={user.username} />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default OnlineUsers;
