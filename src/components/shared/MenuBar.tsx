import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import clsx from 'clsx';
import { theme } from '../../theme/theme';
import { useRecoilState } from 'recoil';
import { currentChannelState } from '../../atom';
import {
  AppBar,
  Box,
  Container,
  Chip,
  Grid,
  Popover,
  Toolbar,
} from '@material-ui/core';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { useWatchChannelHasActivePollSubscription } from '../../api/generated/graphql';
import MessageInput from '../chat/MessageInput';
import GiphyCarousel from './GiphyCarousel';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import PublishChannelPolling from '../adminPollings/PublishChannelPolling';
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
  popoverRoot: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

interface MenuBarProps {
  user: [];
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
  const { data } = useWatchChannelHasActivePollSubscription({
    variables: {
      currentChannelId: currentChannel.id,
    },
  });
  const [open, setOpen] = React.useState(false); // Sidebar default state
  const [showGiphyCarousel, setShowGiphyCarousel] = React.useState(false);

  const handleDrawerOpen = () => {
    console.log('drawer open called');

    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleGiphyClick = () => {
    setShowGiphyCarousel(!showGiphyCarousel);
  };

  const hideGiphyCarousel = () => {
    setShowGiphyCarousel(false);
  };

  return (
    <>
      <AppBar
        elevation={0}
        position="fixed"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <Container maxWidth="xl" disableGutters>
            <Grid container>
              <Grid item xs={12}>
                <MobileMenu
                  nickname={user.nickname}
                  channelName={currentChannel.name}
                  isPrivate={currentChannel?.is_private}
                  pollQuestion={
                    data?.poll_questions[0]?.text
                      ? data?.poll_questions[0]?.text
                      : ''
                  }
                  handleDrawerOpen={handleDrawerOpen}
                  handleGiphyClick={handleGiphyClick}
                />

                {/* {data?.poll_questions?.length === 1 && (
                  <PopupState variant="popover" popupId="demoPopper">
                    {(popupState) => (
                      <>
                        <Chip
                          {...bindTrigger(popupState)}
                          variant="outlined"
                          color="secondary"
                          size="small"
                          icon={<HowToVoteIcon color="secondary" />}
                          label="Admin Polling"
                        />
                        <Popover
                          anchorReference={'none'} // set popup center window
                          anchorEl={'popper'}
                          classes={{
                            root: classes.popoverRoot,
                          }}
                          {...bindPopover(popupState)}
                        >
                          <Box
                            display="flex"
                            justifyContent="center"
                            p={2}
                            style={{ minWidth: '30vw' }}
                          >
                            <PublishChannelPolling
                              user={[]}
                              channelId={channelId}
                              currentChannel={0}
                              selectedPollAnswerId={0}
                            />
                          </Box>
                        </Popover>
                      </>
                    )}
                  </PopupState>
                )} */}
              </Grid>
              <Grid item xs={12}>
                <MessageInput
                  channelId={channelId}
                  handleSetLastMessage={handleSetLastMessage}
                  preLastMessageId={preLastMessageId}
                />
              </Grid>
              <Grid item xs={12}>
                <Box
                  style={{ display: showGiphyCarousel ? 'block' : 'none' }}
                  className={classes.giphyImage}
                  order={1}
                  flex="1"
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <GiphyCarousel
                    hideGiphyCarousel={() => hideGiphyCarousel()}
                  />
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Toolbar>
        <MenuBarDrawer open={open} handleDrawerClose={handleDrawerClose} />
      </AppBar>
    </>
  );
};

export default MenuBar;
