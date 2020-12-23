import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Grid, List } from '@material-ui/core';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { Message } from '../../interfaces/message.interface';
import {
  useWatchMessagesSubscription,
  Channel_Type_Enum,
  useUpsertMessageCursorMutation,
} from '../../api/generated/graphql';

import Alert from '@material-ui/lab/Alert';
import MenuBar from '../shared/MenuBar';
import Logo from '../shared/Logo';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useHistory } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    overflowY: 'scroll',
    maxHeight: '100vh',
    marginTop: theme.spacing(0),
    paddingBottom: theme.spacing(0),
    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(3),
      paddingTop: theme.spacing(7),
      paddingBottom: theme.spacing(20),
    },
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(1),
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(9),
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0),
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(9),
    },
  },
  messageInput: {
    position: 'fixed',
    bottom: 0,
    padding: theme.spacing(2),
    background: theme.palette.background.default,
    zIndex: 1000,
    [theme.breakpoints.up('md')]: {
      width: '70vw',
    },
    [theme.breakpoints.up('lg')]: {
      width: '75vw',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100vw',
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
  const [limit, setLimit] = useState<number>(20);
  const [lastMessage, setLastMessage] = useState<Message | null>(null);
  const { user } = useAuth0();
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

  const [upsertMessageCursorMutation] = useUpsertMessageCursorMutation();

  const scrollToBottom = () => {
    if (typeof messagesEndRef === 'object') {
      setTimeout(() => {
        messagesEndRef?.current?.scrollIntoView();
      }, 100);
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
  }, [data]);

  useEffect(() => {
    setTimeout(() => {
      scrollToBottom();
    }, 1000);
  }, []);

  if (error) {
    return <Alert severity="error">Messages could not be loaded.</Alert>;
  }

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        style={{ height: '100vh' }}
      >
        <Box>
          <Logo />
          <LinearProgress color="secondary" style={{ marginTop: '8px' }} />
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
        {isPrivate && channelType !== Channel_Type_Enum.DirectMessage && (
          <Box
            display="flex"
            justifyContent="center"
            style={{ marginBottom: '20px' }}
          >
            <Button
              color="secondary"
              variant="contained"
              type="button"
              onClick={navigateToAddChannelMembers}
            >
              Add users to channel
            </Button>
          </Box>
        )}
        <List id="message-list">
          <MessageList
            messages={data?.messages as Message[]}
            lastMessage={lastMessage}
            preLastMessageId={preLastMessageId}
            user={user}
            handleIncreaseLimit={handleIncreaseLimit}
          />
        </List>
        <div ref={messagesEndRef} />
      </Box>
      <Box className={classes.messageInput}>
        <MenuBar channelId={channelId}>
          <MessageInput
            channelId={channelId}
            handleSetLastMessage={handleSetLastMessage}
            preLastMessageId={preLastMessageId}
            scrollToBottom={scrollToBottom}
          />
        </MenuBar>
      </Box>
    </>
  );
};

export default Chat;
