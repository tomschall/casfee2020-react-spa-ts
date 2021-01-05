import React, { useState, useEffect, useRef } from 'react';
import { Box, Button } from '@material-ui/core';
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
import { useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { makeStyles } from '@material-ui/core/styles';
import MobileHeaderMenu from './MobileHeaderMenu';
import { ChatParams } from '../../interfaces/param.interface';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexBasis: '100%',
    flex: '1',
    overflowY: 'scroll',
    maxHeight: '80vh',
    height: '80vh',
  },
  messageInput: {
    position: 'fixed',
    bottom: 0,
    padding: theme.spacing(2),
    background: theme.palette.background.default,
    zIndex: 1000,
    [theme.breakpoints.up('md')]: {
      width: '75vw',
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  let preLastMessageId: number = 0;
  const { channel: channelName } = useParams<ChatParams>();

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

  return (
    <>
      <MobileHeaderMenu
        channelName={channelName}
        user={user.sub}
        showAddUserButton={true}
      />
      <Box className={classes.root} component="article">
        <MessageList
          messages={data?.messages as Message[]}
          lastMessage={lastMessage}
          preLastMessageId={preLastMessageId}
          user={user}
          handleIncreaseLimit={handleIncreaseLimit}
          limit={limit}
        />
        <div ref={messagesEndRef}></div>
      </Box>
      <Box className={classes.messageInput} component="footer">
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
