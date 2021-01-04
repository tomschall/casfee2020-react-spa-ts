import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { theme } from '../../theme/theme';
import { useRecoilState } from 'recoil';
import { Box, Chip, IconButton } from '@material-ui/core';
import { currentChannelState } from '../../atom';
import PeopleIcon from '@material-ui/icons/People';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import PollPopUp from '../../components/adminPollings/PollPopup';
import Logout from '../Logout';
import MenuBarDrawer from '../shared/MenuBarDrawer';
import SideBar from '../shared/SideBar';

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
  menuButton: {
    width: 50,
    height: 50,
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
}

const MobileHeaderMenu: React.FC<MobileHeaderMenuProps> = ({ channelName }) => {
  const classes = useStyles();
  const [currentChannel] = useRecoilState<any>(currentChannelState);
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  console.log('currentChannel', currentChannel);

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        flexDirection="row"
        width={1}
        className={classes.root}
        component="header"
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
        <Chip
          size="small"
          variant="outlined"
          color="primary"
          label={channelName}
          icon={<PeopleIcon />}
          className={classes.title}
          aria-label={`channel: ${channelName}`}
        />
        <PollPopUp channelId={currentChannel?.id} />
        <Logout />
      </Box>
      <MenuBarDrawer open={open}>
        <SideBar handleDrawerClose={handleDrawerClose} open={open} />
      </MenuBarDrawer>
    </>
  );
};

export default MobileHeaderMenu;
