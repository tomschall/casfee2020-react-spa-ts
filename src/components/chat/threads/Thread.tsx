import React, { useState, useEffect } from 'react';
import { Grid, List, Container, useMediaQuery } from '@material-ui/core';
import { Message } from '../../../interfaces/message/message.interface';
import { Box } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { makeStyles } from '@material-ui/core/styles';
import { useRecoilState } from 'recoil';
import { currentChannelState } from '../../../atom';
import SideBar from '../../shared/SideBar';
import { theme } from '../../../theme/theme';

const useStyles = makeStyles((theme) => ({
  root: {
    overflowY: 'scroll',
    height: '75vh',
    marginTop: theme.spacing(5),
  },
  messageContainer: {
    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(10),
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(0),
    },
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(3),
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(0),
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0),
      paddingTop: theme.spacing(0),
      paddingBottom: theme.spacing(0),
    },
  },
}));

const Thread: React.FC = () => {
  const classes = useStyles();

  const [limit, setLimit] = useState(20);
  const [lastMessage, setLastMessage] = useState({});
  const { user, error: auth0Error } = useAuth0();
  const [currentChannel, setCurrentChannel] = useRecoilState<any>(
    currentChannelState,
  );
  let history = useHistory();

  let preLastMessageId = 0;

  useEffect(() => {
    console.log('Thread Component mounted');
  }, []);

  const handleIncreaseLimit = () => {
    setLimit(limit + 20);
  };

  const handleSetLastMessage = (lastMessage: Message) => {
    setLastMessage(lastMessage);
  };

  console.log('current channel', currentChannel);

  return (
    <>
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={12} className={classes.messageContainer}>
            <List id="message-list">
              {/* <MessageList
                messages={data?.messages as Message[]}
                lastMessage={lastMessage}
                preLastMessageId={preLastMessageId}
                user={user}
              /> */}
            </List>
          </Grid>
          <Box maxWidth="xl" component="nav">
            {/* <MenuBar
              channelId={channelId}
              handleSetLastMessage={handleSetLastMessage}
              preLastMessageId={preLastMessageId}
            /> */}
          </Box>
        </Grid>
      </div>
    </>
  );
};

export default Thread;
