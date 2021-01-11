import React from 'react';
import clsx from 'clsx';
import { Drawer, makeStyles, Toolbar } from '@material-ui/core';

const drawerWidth = '100%';

const useStyles = makeStyles((theme) => ({
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
}));

interface MenuBarDrawerProps {
  open: boolean;
}

const MenuBarDrawer: React.FC<MenuBarDrawerProps> = ({ children, open }) => {
  const classes = useStyles();

  return (
    <Drawer
      variant="temporary"
      elevation={0}
      anchor="left"
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
      }}
      open={open}
    >
      <Toolbar className={classes.toolbar}>{children}</Toolbar>
    </Drawer>
  );
};

export default MenuBarDrawer;
