import React from 'react';
import { useParams } from 'react-router';
import { theme } from '../../theme/theme';
import { Container, Grid } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { ChatParams } from '../../interfaces/param.interface';
import SideBar from '../shared/SideBar';
import ChatApp from './ChatApp';
import MobileHeaderMenu from '../chat/MobileHeaderMenu';

const useStyles = makeStyles((theme) => ({
  container: {
    margin: 0,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    overflowX: 'hidden',
    overflowY: 'hidden',
    height: '100vh',
  },
  sidebar: {
    overflowY: 'hidden',
    minHeight: '50vh',
    display: 'flex',
    alignItems: 'flex-start',
    borderRightWidth: 1,
    borderRightStyle: 'solid',
    borderRightColor: theme.palette.primary.dark,
  },
  chatApp: {
    height: '100vh',
    overflowY: 'hidden',
  },
}));

const ChatContainer: React.FC = () => {
  const classes = useStyles();
  const { channel: channelName } = useParams<ChatParams>();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Container
      component="main"
      disableGutters
      maxWidth="xl"
      className={classes.container}
    >
      {matches === true && (
        <Grid
          item
          xs={5}
          sm={4}
          md={3}
          className={classes.sidebar}
          component="nav"
        >
          <SideBar handleDrawerClose={() => false} open={false} />
        </Grid>
      )}
      <Grid item xs={12} md={9} className={classes.chatApp} component="section">
        <MobileHeaderMenu channelName={channelName} />
        <ChatApp />
      </Grid>
    </Container>
  );
};

export default ChatContainer;
