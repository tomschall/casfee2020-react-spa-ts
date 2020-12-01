import React from 'react';
import clsx from 'clsx';
import { theme } from '../../../theme/theme';
import { AppBar, Box, Container, Chip, Grid, Toolbar } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ExpandLess from '@material-ui/icons/ExpandLess';
import { makeStyles } from '@material-ui/core/styles';
import ThreadDrawer from './ThreadDrawer';

const drawerWidth = '100%';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
    },
    [theme.breakpoints.down('md')]: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
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
}));

interface ThreadMenuBarProps {
  channelThreadId?: number | undefined;
}

const ThreadMenuBar: React.FC<ThreadMenuBarProps> = ({ channelThreadId }) => {
  const classes = useStyles();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <AppBar
      elevation={0}
      position="fixed"
      className={clsx(classes.appBar, open && classes.appBarShift)}
    >
      <Toolbar className={classes.toolbar}>
        <Container maxWidth="xl" disableGutters>
          <Grid container>
            <Grid item style={{ flex: 1 }}>
              {matches === false && (
                <Box
                  order={1}
                  display="flex"
                  flex="1"
                  justifyContent="flex-end"
                  alignItems="flex-end"
                >
                  <Chip
                    variant="default"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    label="Menu"
                    clickable
                    size="small"
                    color="secondary"
                    icon={<ExpandLess />}
                  />
                </Box>
              )}
            </Grid>
          </Grid>
        </Container>
      </Toolbar>
      <ThreadDrawer open={open} handleDrawerClose={handleDrawerClose} />
    </AppBar>
  );
};

export default ThreadMenuBar;
