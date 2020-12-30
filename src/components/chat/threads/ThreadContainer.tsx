import React from 'react';
import { Grid, Container, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { theme } from '../../../theme/theme';
import { useParams } from 'react-router';
import { ThreadParams } from '../../../interfaces/param.interface';
import SideBar from '../../shared/SideBar';
import MobileHeaderMenu from '../MobileHeaderMenu';
import Thread from './Thread';
import ThreadListContainer from './ThreadListContainer';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    overflowX: 'hidden',
    overflowY: 'hidden',
  },
  sidebar: {
    height: '100vh',
    maxHeight: '100vh',
    display: 'flex',
    alignItems: 'flex-start',
    paddingTop: theme.spacing(5),
    borderRightWidth: 1,
    borderRightStyle: 'solid',
    borderRightColor: theme.palette.primary.dark,
  },
  chatApp: {
    height: '100vh',
    overflowY: 'hidden',
  },
}));

const ThreadContainer: React.FC = () => {
  const classes = useStyles();

  const matches = useMediaQuery(theme.breakpoints.up('md'));

  const { channel } = useParams<ThreadParams>();

  return (
    <>
      <Container
        component="main"
        maxWidth="xl"
        disableGutters
        className={classes.container}
      >
        {matches === true && (
          <Grid item xs={5} md={3} className={classes.sidebar}>
            <SideBar handleDrawerClose={() => false} open={false} />
          </Grid>
        )}
        <Grid item xs={12} md={9} className={classes.chatApp}>
          <MobileHeaderMenu
            channelName={`${channel ? `Thread - ${channel}` : 'Threadlist'}`}
          />
          {channel ? <Thread /> : <ThreadListContainer />}
        </Grid>
      </Container>
    </>
  );
};

export default ThreadContainer;
