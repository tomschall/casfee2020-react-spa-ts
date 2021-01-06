import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { theme } from '../../theme/theme';
import { useRecoilState } from 'recoil';
import { Box, Button, Chip, IconButton } from '@material-ui/core';
import { currentChannelState } from '../../atom';
import PeopleIcon from '@material-ui/icons/People';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import PollPopUp from '../../components/adminPollings/PollPopup';
import Logout from '../Logout';
import MenuBarDrawer from '../shared/MenuBarDrawer';
import SideBar from '../shared/SideBar';
import UserHeader from '../shared/UserHeader';
import { Channel_Type_Enum } from '../../api/generated/graphql';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    justifyContent: 'space-between',
    backgroundColor: theme.palette.background.default,
    marginTop: theme.spacing(0),
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    zIndex: 1000,
    [theme.breakpoints.up('md')]: {
      position: 'fixed',
      width: '75vw',
    },
    [theme.breakpoints.down('md')]: {
      position: 'fixed',
    },
  },
  outerContainer: {
    paddingBottom: '65px',
  },
  menuButton: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    backgroundColor: theme.palette.secondary.main,
    marginLeft: theme.spacing(0),
    '& .MuiIconButton-label': {
      marginLeft: theme.spacing(1),
    },
  },
  title: {
    width: 180,
    maxWidth: theme.spacing(22),
  },
}));

interface MobileHeaderMenuProps {
  channelName: string;
  channel?: string;
  user?: string;
  showAddUserButton?: boolean;
}

const MobileHeaderMenu: React.FC<MobileHeaderMenuProps> = ({
  channelName,
  user,
  showAddUserButton,
  channel,
}) => {
  const classes = useStyles();
  const [currentChannel] = useRecoilState<any>(currentChannelState);
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const [open, setOpen] = React.useState(false);
  let history = useHistory();

  const handleDrawerOpen = () => {
    if (channel) {
      history.push(`/channel/${channel}`);
      return;
    }
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const navigateToAddChannelMembers = () => {
    history.push(`/addChannelMembers`);
  };

  return (
    <Box component="article" className={classes.outerContainer}>
      <Box
        display="flex"
        alignItems="center"
        flexDirection="row"
        width={1}
        className={classes.root}
        component="nav"
      >
        {matches === false && (
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="open menu"
            onClick={handleDrawerOpen}
          >
            <ArrowBackIosIcon />
          </IconButton>
        )}
        {currentChannel?.channel_type === Channel_Type_Enum.DirectMessage &&
          user && <UserHeader channelId={currentChannel.id} user={user} />}
        {currentChannel?.channel_type === Channel_Type_Enum.ChatMessage &&
          currentChannel?.is_private === false && (
            <Chip
              size="small"
              variant="outlined"
              color="primary"
              label={channelName}
              icon={<PeopleIcon />}
              className={classes.title}
              aria-label={`channel: ${channelName}`}
            />
          )}
        {currentChannel?.channel_type === Channel_Type_Enum.ChatMessage &&
          currentChannel?.is_private === true &&
          !showAddUserButton && (
            <Chip
              size="small"
              variant="outlined"
              color="primary"
              label={channelName}
              icon={<PeopleIcon />}
              className={classes.title}
              aria-label={`channel: ${channelName}`}
            />
          )}
        {currentChannel?.channel_type === Channel_Type_Enum.ChatMessage &&
          currentChannel?.is_private === true &&
          showAddUserButton && (
            <Box display="flex" justifyContent="center" component="article">
              <Button
                color="secondary"
                variant="contained"
                type="button"
                onClick={navigateToAddChannelMembers}
                aria-label="add user to channel"
              >
                Add users to channel
              </Button>
            </Box>
          )}
        <PollPopUp channelId={currentChannel?.id} />
        <Logout />
      </Box>
      <MenuBarDrawer open={open}>
        <SideBar handleDrawerClose={handleDrawerClose} open={open} />
      </MenuBarDrawer>
    </Box>
  );
};

export default MobileHeaderMenu;
