import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Box, Divider, Grid } from '@material-ui/core';
import UserStatus from '../../../components/UserStatus';
import Channels from '../../../components/ChannelList';
import DirectMessageUserList from '../../../components/DirectMessageUserList';
import Logout from '../../../components/Logout';
import AddChannel from '../../../components/AddChannel';
import useStyles from './styles';

const SideBar: React.FC<any> = () => {
  const { user } = useAuth0();
  const classes = useStyles();

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        flex="1"
        className={classes.root}
      >
        <Grid container>
          <Grid item xs={12}>
            <UserStatus user_id={user.sub} />
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
          <Box className={classes.treeView}>
            <Divider />
            <Channels />
            <Divider />
            <DirectMessageUserList user_id={user.sub} />
            <Divider />
            <Logout />
          </Box>
        </Grid>
      </Box>
    </>
  );
};

export default SideBar;
