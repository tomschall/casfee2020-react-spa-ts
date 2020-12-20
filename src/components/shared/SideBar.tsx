import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Box, Divider, Grid } from '@material-ui/core';
import UserStatus from './UserStatus';
import ChannelList from '../chat/ChannelList';
import DirectMessageUserList from '../chat/DirectMessageUserList';
import Logout from '../Logout';
import AddChannel from '../chat/AddChannel';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing(5),
      marginLeft: theme.spacing(5),
      marginTop: theme.spacing(0),
      marginBottom: theme.spacing(5),
    },
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(2),
      margin: theme.spacing(0),
      paddingTop: theme.spacing(2),
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0),
      margin: theme.spacing(0),
      paddingTop: theme.spacing(10),
    },
  },
  treeView: {
    marginRight: theme.spacing(0),
    marginLeft: theme.spacing(0),
    paddingRight: theme.spacing(0),
  },
  branding: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    [theme.breakpoints.down('md')]: {
      width: '150px',
    },
    [theme.breakpoints.up('md')]: {
      width: '200px',
    },
  },
}));

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
              className={classes.logo}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <AddChannel />
          <Box className={classes.treeView}>
            <Divider />
            <ChannelList />
            <Divider />
            <DirectMessageUserList user_id={user.sub} />
            <Divider />
            <Box
              display="flex"
              justifyContent="flex-end"
              alignItems="flex-end"
              style={{ marginRight: '16px' }}
            >
              <Logout />
            </Box>
          </Box>
        </Grid>
      </Box>
    </>
  );
};

export default SideBar;
