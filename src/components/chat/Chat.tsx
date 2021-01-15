import React, { useState, useEffect, useCallback } from 'react';
import { Box } from '@material-ui/core';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { Message } from '../../interfaces/message.interface';
import {
  useWatchMessagesSubscription,
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
    maxHeight: '90vh',
    height: '90vh',
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
}

const Chat: React.FC<ChatProps> = ({ channelId }) => {
  const classes = useStyles();
  const [limit, setLimit] = useState<number>(20);
  const [lastMessage, setLastMessage] = useState<Message | null>(null);
  const [ref, setRef] = useState<React.RefObject<HTMLDivElement> | null>(null);
  const [scrollIsInit, setScrollIsInit] = useState<boolean>(true);
  const { user } = useAuth0();

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

  const scrollToBottom = useCallback(() => {
    if (typeof ref === 'object') {
      setTimeout(() => {
        ref?.current?.scrollIntoView();
      }, 200);
    }
  }, [ref]);

  useEffect(() => {
    if (data?.messages[0]?.id)
      upsertMessageCursorMutation({
        variables: {
          channel_id: channelId,
          message_id: data?.messages[0]?.id,
          user_id: user.sub,
        },
      });

    setTimeout(() => {
      if (scrollIsInit && data && data?.messages?.length > 5) {
        scrollToBottom();
        setScrollIsInit(false);
      }
    }, 1000);
  }, [
    ref,
    data,
    channelId,
    user.sub,
    scrollIsInit,
    scrollToBottom,
    upsertMessageCursorMutation,
  ]);

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
    <Box display="flex" flexDirection="column">
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
          setRef={setRef}
        />
      </Box>
      <Box className={classes.messageInput} component="footer">
        <MenuBar>
          <MessageInput
            channelId={channelId}
            handleSetLastMessage={handleSetLastMessage}
            preLastMessageId={preLastMessageId}
            scrollToBottom={scrollToBottom}
          />
        </MenuBar>
      </Box>
    </Box>
  );
};

export default Chat;
