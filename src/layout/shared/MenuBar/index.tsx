import React from 'react';
import clsx from 'clsx';
import { theme } from '../../../theme/theme';
import {
  AppBar,
  Box,
  Container,
  Chip,
  Drawer,
  Grid,
  Toolbar,
} from '@material-ui/core';
import SideBar from '../Sidebar';
import MessageInput from '../../../components/messageInput';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import FaceIcon from '@material-ui/icons/Face';
import PeopleIcon from '@material-ui/icons/People';
import useStyles from './styles';

const MenuBar: React.FC<any> = () => {
  const classes = useStyles();
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
      <AppBar
        elevation={0}
        position="fixed"
        className={
          (clsx(classes.appBar, open && classes.appBarShift),
          classes.desktopNavi)
        }
      >
        <Toolbar className={classes.toolbar}>
          <Container maxWidth="xl" disableGutters>
            <Grid container>
              <Grid item xs={9}>
                <Chip
                  variant="outlined"
                  color="primary"
                  size="small"
                  icon={<FaceIcon />}
                  label="Thomas"
                />

                <Chip
                  color="secondary"
                  variant="outlined"
                  size="small"
                  icon={<PeopleIcon />}
                  label="General"
                />
              </Grid>
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
              <Grid item xs={12}>
                <MessageInput />
              </Grid>
            </Grid>
          </Container>
        </Toolbar>

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
      </AppBar>
    </>
  );
};

export default MenuBar;
