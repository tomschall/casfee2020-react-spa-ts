import React from 'react';
import { Grid, Divider } from '@material-ui/core';
import UserStatus from '../../../components/userStatus';
import Channels from '../../../components/channels';
import Users from '../../../components/users';
import Logout from '../../../components/logout';
import AddChannel from '../../../components/addChannel';

import useStyles from './styles';

const SideBar: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={12}>
            <UserStatus />
          </Grid>
          <Grid item xs={12} className={classes.branding}>
            <img
              alt="The Great Chicken Fest"
              src="/the-great-chicken-fest.svg"
              width="300"
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <AddChannel />
          <div className={classes.treeView}>
            <Divider />
            <Channels />
            <Divider />
            <Users />
            <Divider />
          </div>
          <Logout />
        </Grid>
      </div>
    </>
  );
};

export default SideBar;
