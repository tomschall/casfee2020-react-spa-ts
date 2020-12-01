import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import clsx from 'clsx';
import { theme } from '../../../theme/theme';
import { useRecoilState } from 'recoil';
import { currentChannelState } from '../../../atom';
import { AppBar, Box, Container, Chip, Grid, Toolbar } from '@material-ui/core';
import AddGif from '@material-ui/icons/Gif';
import ThreadMessageInput from './ThreadMessageInput';
import GiphyCarousel from '../../shared/GiphyCarousel';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ExpandLess from '@material-ui/icons/ExpandLess';
import FaceIcon from '@material-ui/icons/Face';
import ChatIcon from '@material-ui/icons/Chat';
import PeopleIcon from '@material-ui/icons/People';
import EnhancedEncryptionOutlinedIcon from '@material-ui/icons/EnhancedEncryptionOutlined';
import { makeStyles } from '@material-ui/core/styles';
import MenuBarDrawer from '../../shared/MenuBarDrawer';

const drawerWidth = '100%';

const useStyles = makeStyles((theme) => ({
  root: {},
  toolbar: {
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
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
  giphyImage: {
    marginTop: theme.spacing(2),
  },
}));

interface ThreadInputContainerProps {
  channelThreadId: number | undefined;
}

const ThreadInputContainer: React.FC<ThreadInputContainerProps> = ({
  channelThreadId,
}) => {
  const { user } = useAuth0();
  const classes = useStyles();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const [currentChannel, setCurrentChannel] = useRecoilState<any>(
    currentChannelState,
  );

  const [open, setOpen] = React.useState(false); // Sidebar default state
  const [showGiphyCarousel, setShowGiphyCarousel] = React.useState(false);

  const handleDrawerOpen = () => {
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
                    currentChannel?.is_private === true ? (
                      <EnhancedEncryptionOutlinedIcon />
                    ) : (
                      <PeopleIcon color="secondary" />
                    )
                  }
                  label={currentChannel?.name}
                />
                <Chip
                  variant="outlined"
                  color="secondary"
                  size="small"
                  icon={<ChatIcon />}
                  label="thread"
                />
                <Chip
                  variant="outlined"
                  color="primary"
                  size="small"
                  icon={<AddGif />}
                  label="+Gif"
                  onClick={handleGiphyClick}
                />
                <Box
                  style={{ display: showGiphyCarousel ? 'flex' : 'none' }}
                  className={classes.giphyImage}
                  order={1}
                  flex="1"
                  justifyContent="flex-end"
                  alignItems="flex-end"
                >
                  <GiphyCarousel
                    hideGiphyCarousel={() => hideGiphyCarousel()}
                  />
                </Box>
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
                <ThreadMessageInput
                  channelId={currentChannel?.id}
                  channelThreadId={channelThreadId}
                />
              </Grid>
            </Grid>
          </Container>
        </Toolbar>
        <MenuBarDrawer open={open} handleDrawerClose={handleDrawerClose} />
      </AppBar>
    </>
  );
};

export default ThreadInputContainer;
