import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Loader from '../../layout/shared/Loader';

import {
  Badge,
  Chip,
  CircularProgress,
  Container,
  Grid,
  Tooltip,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import PeopleIcon from '@material-ui/icons/People';
import FaceIcon from '@material-ui/icons/Face';

import { useWatchOnlineUsersSubscription } from '../../api/generated/graphql';
import { useSetUserOnlineMutation } from '../../api/generated/graphql';

interface OnlineUsersProps {
  user_id: string;
}

const UserStatus: React.FC<OnlineUsersProps> = ({ user_id }) => {
  const { data, loading, error } = useWatchOnlineUsersSubscription();
  const { user } = useAuth0();
  const usersOnline = data?.users.length ?? 0;

  const [sendUserIsOnline] = useSetUserOnlineMutation({
    variables: { user_id },
  });

  useEffect(() => {
    const timeout = setInterval(() => {
      sendUserIsOnline();
    }, 5000);
  }, []);

  if (error) {
    return <Alert severity="error">Online users could not be loaded.</Alert>;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Container>
        <Grid container justify="space-between">
          <Grid item>
            <Chip
              variant="outlined"
              color="primary"
              size="small"
              icon={<FaceIcon />}
              label={user.nickname}
            />
          </Grid>
          <Grid item>
            <Tooltip
              title="Users online"
              aria-label="Unsers online"
              placement="top"
            >
              <Badge color="secondary" badgeContent={usersOnline}>
                <PeopleIcon color="primary" />
              </Badge>
            </Tooltip>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default UserStatus;
