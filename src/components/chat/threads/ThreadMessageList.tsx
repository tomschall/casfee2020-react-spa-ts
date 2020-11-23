import React, { useEffect, useRef } from 'react';
import moment from 'moment';
import { ThreadMessage } from '../../../interfaces/message.interface';
import ThreadInfo from './ThreadInfo';
import ThreadDeleteMessage from './ThreadDeleteMessage';
import {
  Avatar,
  Badge,
  Box,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  head: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: theme.spacing(0),
  },
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: theme.spacing(2),
  },
  [theme.breakpoints.up('md')]: {
    messageText: {
      paddingBottom: '1rem',
    },
    reply: {
      fontSize: 11,
      paddingBottom: '1rem',
      color: '#ffffff',
    },
  },
  [theme.breakpoints.down('md')]: {
    messageText: {
      fontSize: 14,
      paddingBottom: '1rem',
    },
    reply: {
      fontSize: 11,
      paddingBottom: '1rem',
      color: '#ffffff',
    },
  },
  [theme.breakpoints.down('sm')]: {
    messageText: {
      fontSize: 12,
      paddingBottom: '1rem',
    },
    reply: {
      fontSize: 11,
      paddingBottom: '1rem',
      color: '#ffffff',
    },
  },
  vspace: {
    marginBottom: theme.spacing(1),
  },
  vspaceTop: {
    marginBottom: theme.spacing(3),
  },
  vspaceBottom: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(0),
  },
  image: {
    paddingBottom: '0.5rem',
  },
}));

interface ThreadMessageListProps {
  messages: ThreadMessage[];
  user: any;
  channelThread: any;
  currentChannel: any;
  isThreadList: boolean;
}

const ThreadMessageList: React.FC<ThreadMessageListProps> = ({
  messages,
  user,
  channelThread,
  currentChannel,
  isThreadList,
}) => {
  useEffect(() => {
    if (!isThreadList) scrollToBottom();
  }, [messages]);

  const classes = useStyles();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (
      messagesEndRef !== null &&
      typeof messagesEndRef === 'object' &&
      messagesEndRef.current !== null
    ) {
      messagesEndRef.current.scrollIntoView();
    }
  };

  const renderMessages = (message: ThreadMessage) => {
    return (
      <ListItem key={message.id} className={classes.root}>
        <Box display="flex" justifyContent="flex-start" alignItems="flex-start">
          <ListItemAvatar>
            <ListItemIcon>
              <Badge variant="dot">
                <Avatar alt="Username" src="https://picsum.photos/100" />
              </Badge>
            </ListItemIcon>
          </ListItemAvatar>
        </Box>
        <Box component="div" display="flex" flexDirection="column" flex="1">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Box
              display="flex"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Typography variant="caption">
                <strong>{message.user.username} </strong>
                <i>{moment(message.timestamp).fromNow()}</i>
              </Typography>
              <Divider className={classes.vspace} />
            </Box>
            <Box>
              <Typography variant="caption">
                {user.sub === message.user.auth0_user_id ? (
                  <ThreadDeleteMessage messageId={message.id} />
                ) : (
                  ''
                )}
              </Typography>
            </Box>
          </Box>
          <Typography component="div" className={classes.messageText}>
            {message.message}
          </Typography>
          {message.image ? (
            <Box className={classes.image}>
              <img src={message.image} />
            </Box>
          ) : (
            ''
          )}
          <Divider className={classes.vspace} />
        </Box>
      </ListItem>
    );
  };

  return (
    <>
      <ThreadInfo
        messages={messages}
        channelThread={channelThread}
        currentChannel={currentChannel}
      />
      {messages
        ? [...messages]
            ?.reverse()
            ?.map((message: ThreadMessage) => renderMessages(message))
        : ''}

      <div ref={messagesEndRef} />
    </>
  );
};

export default ThreadMessageList;
