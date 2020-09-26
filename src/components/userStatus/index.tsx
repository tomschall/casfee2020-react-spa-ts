import React from 'react';
import { Badge, Chip, Container, Grid, Tooltip } from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/People';
import FaceIcon from '@material-ui/icons/Face';

const UserStatus: React.FC = () => {
  const usersOnline = 5;

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
              label="Username"
            />
          </Grid>
          <Grid item>
            <Tooltip
              title="Users online"
              aria-label="Users online"
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
