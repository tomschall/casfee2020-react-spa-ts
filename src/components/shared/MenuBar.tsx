import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import clsx from 'clsx';
import { theme } from '../../theme/theme';
import { useRecoilState } from 'recoil';
import { currentChannelState } from '../../atom';
import { Box, Button, IconButton } from '@material-ui/core';
import GiphyCarousel from './GiphyCarousel';
import AddGif from '@material-ui/icons/Gif';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MenuBarDrawer from './MenuBarDrawer';
import MobileMenu from '../chat/MobileMenu';
import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = '100%';

const useStyles = makeStyles((theme) => ({
  root: {},
  toolbar: {
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(3),
    },
    [theme.breakpoints.down('md')]: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    borderTop: 1,
    borderTopStyle: 'solid',
    borderTopColor: theme.palette.primary.dark,
  },
  appBar: {
    backgroundColor: theme.palette.background.default,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginTop: theme.spacing(5),
    flex: '1',
  },
  menuButtonHidden: {
    display: 'none',
  },
  drawerPaper: {
    height: '100vh',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: drawerWidth,
  },
  appBarSpacer: theme.mixins.toolbar,
  fab: {
    margin: theme.spacing(2),
  },
  giphyImage: {
    padding: theme.spacing(1),
    marginTop: theme.spacing(2),
  },
  giphyButton: {
    [theme.breakpoints.up('md')]: {
      height: 56,
    },
  },
  popoverRoot: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

interface MenuBarProps {
  children: any;
  channelId: number;
}

const MenuBar: React.FC<MenuBarProps> = ({ children, channelId }) => {
  const { user } = useAuth0();
  const classes = useStyles();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const [currentChannel, setCurrentChannel] = useRecoilState<any>(
    currentChannelState,
  );
  const [open, setOpen] = React.useState(false); // Sidebar default state
  const [openGiphy, setOpenGiphy] = React.useState<boolean>(false);

  const [showGiphyCarousel, setShowGiphyCarousel] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleGiphyClick = () => {
    setShowGiphyCarousel(!showGiphyCarousel);
    setOpenGiphy(!openGiphy);
  };

  const hideGiphyCarousel = () => {
    setOpenGiphy(!openGiphy);
    setShowGiphyCarousel(false);
  };

  return (
    <>
      <Box
        style={{ display: showGiphyCarousel ? 'block' : 'none' }}
        className={classes.giphyImage}
        order={1}
        flex="1"
        justifyContent="flex-start"
        alignItems="center"
      >
        <GiphyCarousel hideGiphyCarousel={() => hideGiphyCarousel()} />
      </Box>
      <Box display="flex" justifyContent="flex-end" alignItems="flex-end">
        <Box flex={1}>
          <Button
            color={openGiphy === false ? 'primary' : 'secondary'}
            size="large"
            onClick={handleGiphyClick}
            className={classes.giphyButton}
            aria-label="giphy"
          >
            <AddGif />
          </Button>
        </Box>
        <Box flex={16} justifyContent="flex-end">
          {children}
        </Box>
      </Box>

      <MenuBarDrawer open={open} handleDrawerClose={handleDrawerClose} />
    </>
  );
};

export default MenuBar;
