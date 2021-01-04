import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router';
import { ThreadParams } from '../../../interfaces/param.interface';
import MobileHeaderMenu from '../MobileHeaderMenu';
import Thread from './Thread';
import ThreadListContainer from './ThreadListContainer';

const useStyles = makeStyles(() => ({
  chatApp: {
    height: '100vh',
    overflowY: 'hidden',
  },
}));

const ThreadContainer: React.FC = () => {
  const classes = useStyles();
  const { channel } = useParams<ThreadParams>();

  return (
    <Grid item xs={12} md={9} className={classes.chatApp}>
      <MobileHeaderMenu
        channelName={`${channel ? `Thread - ${channel}` : 'Threadlist'}`}
      />
      {channel ? <Thread /> : <ThreadListContainer />}
    </Grid>
  );
};

export default ThreadContainer;
