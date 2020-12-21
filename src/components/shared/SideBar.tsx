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
    [theme.breakpoints.up('sm')]: {},
    [theme.breakpoints.down('sm')]: {},
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
  menuButton: {
    width: 50,
    height: 50,
    backgroundColor: theme.palette.primary.dark,
    marginLeft: theme.spacing(1),
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
}));

interface SidebarProps {
  handleDrawerClose: () => void;
  open: boolean;
}

const SideBar: React.FC<SidebarProps> = ({ handleDrawerClose, open }) => {
  const { user } = useAuth0();
  const classes = useStyles();
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
        <Grid container>
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
              style={{
                marginLeft: theme.spacing(3),
                marginTop: theme.spacing(0),
              }}
            >
              <IconButton
                aria-label="open drawer"
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
              alignItems="center"
              style={{ paddingRight: 8 }}
            >
              <Logout />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default SideBar;
