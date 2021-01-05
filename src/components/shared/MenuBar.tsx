import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button } from '@material-ui/core';
import GiphyCarousel from './GiphyCarousel';
import AddGif from '@material-ui/icons/Gif';
import MenuBarDrawer from './MenuBarDrawer';
import SideBar from './SideBar';

const useStyles = makeStyles((theme) => ({
  giphyImage: {
    padding: theme.spacing(1),
    marginTop: theme.spacing(2),
  },
  giphyButton: {
    [theme.breakpoints.up('md')]: {
      height: 56,
    },
  },
}));

interface MenuBarProps {
  children: any;
  channelId: number;
}

const MenuBar: React.FC<MenuBarProps> = ({ children, channelId }) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [openGiphy, setOpenGiphy] = React.useState<boolean>(false);
  const [showGiphyCarousel, setShowGiphyCarousel] = React.useState(false);

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
      <MenuBarDrawer open={open}>
        <SideBar handleDrawerClose={handleDrawerClose} open={open} />
      </MenuBarDrawer>
    </>
  );
};

export default MenuBar;
