import React from 'react';
import clsx from 'clsx';
import {
  Box,
  Container,
  Drawer,
  IconButton,
  makeStyles,
  Toolbar,
} from '@material-ui/core';
import SideBar from './SideBar';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import { theme } from '../../theme/theme';

const drawerWidth = '100%';

const useStyles = makeStyles((theme) => ({
  root: {},
  toolbar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(0),
      paddingBottom: theme.spacing(5),
    },
    [theme.breakpoints.down('md')]: {
      paddingTop: theme.spacing(0),
      paddingLeft: theme.spacing(0),
      paddingRight: theme.spacing(0),
      paddingBottom: theme.spacing(2),
    },
    borderTop: 1,
    borderTopStyle: 'solid',
    borderTopColor: theme.palette.primary.dark,
  },
  menuButton: {
    width: 30,
    height: 30,
    marginLeft: theme.spacing(3),
    '& .MuiIconButton-label': {
      marginLeft: theme.spacing(1),
    },
    justifyContent: 'flex-end',
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
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
    marginTop: theme.spacing(2),
  },
}));

interface MenuBarDrawerProps {
  open: boolean;
  handleDrawerClose: any;
}

const MenuBarDrawer: React.FC<MenuBarDrawerProps> = ({
  open,
  handleDrawerClose,
}) => {
  const classes = useStyles();

  return (
    <Drawer
      variant="temporary"
      elevation={10}
      anchor="left"
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
      }}
      open={open}
    >
      <Toolbar className={classes.toolbar}>
        <SideBar handleDrawerClose={handleDrawerClose} open={open} />
      </Toolbar>
    </Drawer>
  );
};

export default MenuBarDrawer;
