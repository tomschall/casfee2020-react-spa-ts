import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Badge, Chip, Container, Grid, Tooltip } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import PeopleIcon from '@material-ui/icons/People';
import FaceIcon from '@material-ui/icons/Face';
import Loader from '../shared/Loader';
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

  return (
    <>
      <Container>
        {!loading ? (
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
        ) : (
          <Grid container justify="center">
            <Loader />
          </Grid>
        )}
      </Container>
    </>
  );
};

export default UserStatus;
