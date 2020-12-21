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
      padding: theme.spacing(1),
      margin: theme.spacing(0),
      paddingTop: theme.spacing(5),
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
      <Grid container>
        <Grid item xs={12} className={classes.branding}>
          <img
            alt="The Great Chicken Fest"
            src="/the-great-chicken-fest.svg"
            className={classes.logo}
          />
        </Grid>
        <Grid item xs={12}>
          <Divider style={{ marginTop: 16, marginBottom: 16 }} />
          <UserStatus user_id={user.sub} />
          <Divider style={{ marginTop: 16, marginBottom: 16 }} />
        </Grid>
        <Grid item xs={12}>
          <DirectMessageUserList user_id={user.sub} />
          <Divider />
          <ChannelList />
          <Divider />
          <AddChannel />
          <Divider />
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            style={{ paddingRight: 8 }}
          >
            <Logout />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default SideBar;
