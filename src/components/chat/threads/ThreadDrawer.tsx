import React from 'react';
import clsx from 'clsx';
import {
  Box,
  Chip,
  Container,
  Drawer,
  makeStyles,
  Toolbar,
} from '@material-ui/core';
import { useHistory } from 'react-router';
import SideBar from '../../shared/SideBar';
import ExpandMore from '@material-ui/icons/ExpandMore';

const drawerWidth = '100%';

const useStyles = makeStyles((theme) => ({
  root: {},
  toolbar: {
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(5),
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
    marginTop: theme.spacing(2),
  },
}));

interface ThreadDrawerProps {
  open: boolean;
  handleDrawerClose: any;
}

const ThreadDrawer: React.FC<ThreadDrawerProps> = ({
  open,
  handleDrawerClose,
}) => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <Drawer
      variant="temporary"
      elevation={10}
      anchor="bottom"
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
      }}
      open={open}
    >
      <Toolbar className={classes.toolbar}>
        <Container maxWidth="xl" disableGutters>
          <SideBar />
          <Box
            order={1}
            display="flex"
            justifyContent="flex-end"
            alignItems="flex-end"
          >
            <Chip
              variant="default"
              aria-label="open drawer"
              onClick={handleDrawerClose}
              label="Menu"
              clickable
              size="small"
              color="secondary"
              icon={<ExpandMore />}
              className={clsx(classes.menuButton, open)}
            />
          </Box>
        </Container>
      </Toolbar>
    </Drawer>
  );
};

export default ThreadDrawer;
