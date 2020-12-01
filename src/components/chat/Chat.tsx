import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Grid, List, Typography } from '@material-ui/core';
import MessageList from './MessageList';
import { Message } from '../../interfaces/message.interface';
import {
  useWatchMessagesSubscription,
  Channel_Type_Enum,
  useUpsertMessageCursorMutation,
} from '../../api/generated/graphql';

import Alert from '@material-ui/lab/Alert';
// import CircularProgress from '@material-ui/core/CircularProgress';
import MenuBar from '../shared/MenuBar';
import Loader from '../shared/Loader';
import { useHistory } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    overflowY: 'scroll',
    maxHeight: '81vh',
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
  polling: {
    position: 'fixed',
    overflow: 'hidden',
    flex: 1,
  },
}));

interface ChatProps {
  channelId: number;
  isPrivate: boolean;
  channelType: Channel_Type_Enum;
}

const Chat: React.FC<ChatProps> = ({ channelId, isPrivate, channelType }) => {
  const classes = useStyles();
  const [limit, setLimit] = useState(20);
  const [lastMessage, setLastMessage] = useState({});
  const { user, error: auth0Error } = useAuth0();
  let history = useHistory();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  let preLastMessageId = 0;

  const { data, loading, error } = useWatchMessagesSubscription({
    variables: {
      channelId: channelId,
      limit: limit,
    },
    fetchPolicy: 'network-only',
  });

  const [
    upsertMessageCursorMutation,
    {
      data: upsertMessageData,
      loading: upsertMessageLoading,
      error: upsertMessageError,
    },
  ] = useUpsertMessageCursorMutation();

  const scrollToBottom = () => {
    if (typeof messagesEndRef === 'object') {
      messagesEndRef?.current?.scrollIntoView();
    }
  };

  useEffect(() => {
    if (data?.messages[0]?.id)
      upsertMessageCursorMutation({
        variables: {
          channel_id: channelId,
          message_id: data?.messages[0]?.id,
          user_id: user.sub,
        },
      });
    scrollToBottom();
  }, [data]);

  if (error) {
    return <Alert severity="error">Messages could not be loaded.</Alert>;
  }

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        style={{ height: '100vh' }}
      >
        <Box>
          <Loader />
        </Box>
        <Box mt={2}>
          <Typography color="secondary" variant="caption">
            Please wait!
          </Typography>
        </Box>
      </Box>
    );
  }

  if (data) {
    preLastMessageId = data?.messages[0]?.id;
  }

  const handleIncreaseLimit = () => {
    setLimit(limit + 20);
  };

  const handleSetLastMessage = (lastMessage: Message) => {
    setLastMessage(lastMessage);
  };

  const navigateToAddChannelMembers = () => {
    history.push(`/addChannelMembers`);
  };

  return (
    <>
      <Box className={classes.root}>
        <Grid container>
          <Grid item xs={12} className={classes.messageContainer}>
            {isPrivate && channelType !== Channel_Type_Enum.DirectMessage && (
              <Button type="button" onClick={navigateToAddChannelMembers}>
                Add users to channel
              </Button>
            )}
            <List id="message-list">
              <MessageList
                messages={data?.messages as Message[]}
                lastMessage={lastMessage}
                preLastMessageId={preLastMessageId}
                user={user}
              />
            </List>
            <div ref={messagesEndRef} />
          </Grid>
          <Box maxWidth="xl" component="nav">
            <MenuBar
              user={user.sub}
              channelId={channelId}
              handleSetLastMessage={handleSetLastMessage}
              preLastMessageId={preLastMessageId}
            />
          </Box>
        </Grid>
      </Box>
    </>
  );
};

export default Chat;
