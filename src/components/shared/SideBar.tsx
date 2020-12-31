import React from 'react';
import clsx from 'clsx';
import { useAuth0 } from '@auth0/auth0-react';
import { Box, Divider, Grid, IconButton } from '@material-ui/core';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import UserStatus from './UserStatus';
import ChannelList from '../chat/ChannelList';
import DirectMessageUserList from '../chat/DirectMessageUserList';
import Logout from '../Logout';
import AddChannel from '../chat/AddChannel';
import { makeStyles } from '@material-ui/core/styles';
import { theme } from '../../theme/theme';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    overflowY: 'scroll',
    WebkitOverflowScrolling: 'touch',
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(5),
    },
    [theme.breakpoints.down('sm')]: {
      height: '100vh',
    },
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
  menuButton: {
    width: 50,
    height: 50,
    backgroundColor: theme.palette.secondary.main,
    marginLeft: theme.spacing(2),
    '& .MuiIconButton-label': {
      marginRight: theme.spacing(1),
    },
    justifyContent: 'flex-end',
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),

    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  logout: {
    paddingRight: theme.spacing(1),
    height: 100,
  },
}));

interface SidebarProps {
  handleDrawerClose: () => void;
  open: boolean;
}

const SideBar: React.FC<SidebarProps> = ({ handleDrawerClose, open }) => {
  const classes = useStyles();
  const { user } = useAuth0();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <>
      <Box
        display="flex"
        flex={1}
        justifyContent="flex-start"
        alignItems="flex-start"
        className={classes.root}
      >
        <Box
          display="flex"
          justifyContent="flex-start"
          flex={1}
          flexDirection="column"
        >
          {matches === true && (
            <Grid item xs={12} className={classes.branding}>
              <img
                alt="The Great Chicken Fest"
                src="/the-great-chicken-fest.svg"
                className={classes.logo}
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              style={{
                marginTop: theme.spacing(0),
              }}
            >
              <IconButton
                aria-label="open menu"
                onClick={handleDrawerClose}
                color="inherit"
                size="medium"
                className={clsx(classes.menuButton, open)}
              >
                <ArrowForwardIos />
              </IconButton>
              <UserStatus user_id={user.sub} />
            </Box>
            <Divider
              style={{ marginTop: theme.spacing(1), marginBottom: 16 }}
            />
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
              alignItems="flex-start"
              className={classes.logout}
            >
              <Logout />
            </Box>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default SideBar;
