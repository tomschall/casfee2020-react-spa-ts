import React from 'react';
import { Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router';
import { ThreadParams } from '../../../interfaces/param.interface';
import MobileHeaderMenu from '../MobileHeaderMenu';
import Thread from './Thread';
import ThreadListContainer from './ThreadListContainer';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexBasis: '100%',
    flex: '1',
    overflowY: 'scroll',
    maxHeight: '90vh',
    height: '90vh',
  },
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
      <Box className={classes.root} component="article">
        {channel ? (
          <>
            <MobileHeaderMenu
              channelName={`Thread - ${channel}`}
              channel={channel}
            />
            <Thread />
          </>
        ) : (
          <>
            <MobileHeaderMenu channelName={'Threadlist'} isThreadList={true} />
            <ThreadListContainer />
          </>
        )}
      </Box>
    </Grid>
  );
};

export default ThreadContainer;
