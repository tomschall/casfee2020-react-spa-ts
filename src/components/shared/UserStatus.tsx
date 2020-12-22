import React from 'react';
import { theme } from '../../theme/theme';
import { useAuth0 } from '@auth0/auth0-react';
import { Badge, Box, Chip, Tooltip } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import PeopleIcon from '@material-ui/icons/People';
import FaceIcon from '@material-ui/icons/Face';
import Loader from './Loader';
import { useWatchOnlineUsersSubscription } from '../../api/generated/graphql';

interface OnlineUsersProps {
  user_id: string;
}

const UserStatus: React.FC<OnlineUsersProps> = ({ user_id }) => {
  const { data, loading, error } = useWatchOnlineUsersSubscription();
  const { user } = useAuth0();
  const usersOnline = data?.users.length ?? 0;

  if (error) {
    return <Alert severity="error">Online users could not be loaded.</Alert>;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <Box
      display="flex"
      flex="1"
      justifyContent="space-between"
      alignItems="center"
      style={{
        marginRight: theme.spacing(3),
        marginLeft: theme.spacing(2),
      }}
    >
      <Chip
        variant="outlined"
        color="primary"
        size="small"
        icon={<FaceIcon />}
        label={user.nickname}
        style={{ marginRight: 30 }}
      />
      <Tooltip title="Users online" aria-label="Unsers online" placement="top">
        <Badge color="secondary" badgeContent={usersOnline}>
          <PeopleIcon color="primary" />
        </Badge>
      </Tooltip>
    </Box>
  );
};

export default UserStatus;
