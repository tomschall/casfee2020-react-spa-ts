import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import clsx from 'clsx';
import { theme } from '../../../theme/theme';
import { useRecoilState } from 'recoil';
import { currentChannelState } from '../../../atom';
import {
  AppBar,
  Box,
  Container,
  Chip,
  Drawer,
  Grid,
  Toolbar,
} from '@material-ui/core';
import SideBar from '../SideBar';
import MessageInput from '../../../components/MessageInput';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import FaceIcon from '@material-ui/icons/Face';
import PeopleIcon from '@material-ui/icons/People';
import EnhancedEncryptionOutlinedIcon from '@material-ui/icons/EnhancedEncryptionOutlined';
import useStyles from './styles';

interface MenuBarProps {
  channelId: number;
  handleSetLastMessage: Function;
  preLastMessageId: number;
}

const MenuBar: React.FC<MenuBarProps> = ({
  channelId,
  handleSetLastMessage,
  preLastMessageId,
}) => {
  const { user } = useAuth0();
  const classes = useStyles();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const [currentChannel, setCurrentChannel] = useRecoilState<any>(
    currentChannelState,
  );

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
                  label={user.nickname}
                />

                <Chip
                  color="secondary"
                  variant="outlined"
                  size="small"
                  icon={
                    currentChannel.is_private === true ? (
                      <EnhancedEncryptionOutlinedIcon />
                    ) : (
                      <PeopleIcon color="secondary" />
                    )
                  }
                  label={currentChannel.name}
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
                <MessageInput
                  channelId={channelId}
                  handleSetLastMessage={handleSetLastMessage}
                  preLastMessageId={preLastMessageId}
                />
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
