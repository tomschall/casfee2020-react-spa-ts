import React from 'react';
import { Grid } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import ChatApp from './ChatApp';

const useStyles = makeStyles(() => ({
  chatApp: {
    height: '100vh',
    overflowY: 'hidden',
  },
}));

const ChatContainer: React.FC = () => {
  const classes = useStyles();

  return (
    <Grid item xs={12} md={9} className={classes.chatApp} component="section">
      <ChatApp />
    </Grid>
  );
};

export default ChatContainer;
