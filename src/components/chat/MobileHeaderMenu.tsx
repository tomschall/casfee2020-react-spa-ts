import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { theme } from '../../theme/theme';
import { useRecoilState } from 'recoil';
import { Box, Button, IconButton } from '@material-ui/core';
import { currentChannelState } from '../../atom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import PollPopUp from '../../components/adminPollings/PollPopup';

import Logout from '../Logout';
import MenuBarDrawer from '../shared/MenuBarDrawer';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    marginTop: theme.spacing(0),
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    zIndex: 1000,
    [theme.breakpoints.down('md')]: {
      position: 'fixed',
    },
    [theme.breakpoints.up('md')]: {
      position: 'fixed',
      width: '75vw',
    },
  },
  menuButton: {
    width: 30,
    height: 30,
    marginLeft: theme.spacing(1),
    '& .MuiIconButton-label': {
      marginLeft: theme.spacing(1),
    },
  },
}));

interface MobileHeaderMenuProps {
  channelName: string;
}

const MobileHeaderMenu: React.FC<MobileHeaderMenuProps> = ({ channelName }) => {
  const classes = useStyles();

  const [currentChannel] = useRecoilState<any>(currentChannelState);

  console.log(currentChannel);

  const matches = useMediaQuery(theme.breakpoints.up('md'));

  const [open, setOpen] = React.useState(false); // Sidebar default state

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexDirection="row"
        width={1}
        className={classes.root}
      >
        {matches === false && (
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
          >
            <ArrowBackIosIcon />
          </IconButton>
        )}
        <Button variant="text">{channelName}</Button>
        <PollPopUp channelId={currentChannel?.id} />
        <Logout />
      </Box>
      <MenuBarDrawer open={open} handleDrawerClose={handleDrawerClose} />
    </>
  );
};

export default MobileHeaderMenu;
