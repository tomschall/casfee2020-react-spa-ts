import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import { isObject } from 'util';
import { ThreadMessage } from '../../../interfaces/message/message.interface';

import DeleteMessage from '../DeleteMessage';
import UpdateMessage from '../UpdateMessage';
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
import { useRecoilValue } from 'recoil';
import { deletedMessageState } from '../../../atom';

const useStyles = makeStyles((theme) => ({
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
}

const ThreadMessageList: React.FC<ThreadMessageListProps> = ({
  messages,
  user,
  channelThread,
  currentChannel,
}) => {
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const classes = useStyles();
  const [showUpdate, setShowUpdate] = useState<boolean>(false);
  const [showUpdateMessageId, setShowUpdateMessageId] = useState<number | null>(
    null,
  );

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const deletedMessage = useRecoilValue<boolean>(deletedMessageState);

  const scrollToBottom = () => {
    if (isObject(messagesEndRef) && messagesEndRef.current !== null) {
      messagesEndRef.current.scrollIntoView();
    }
  };

  const handleShowUpdate = (message: ThreadMessage) => {
    if (message.user.auth0_user_id !== user.sub) return;
    setShowUpdateMessageId(message.id);
    setShowUpdate(!showUpdate);
  };

  const renderThreadInfo = (channelThread: any) => {
    return (
      <React.Fragment>
        <Box>
          <Typography variant="caption">
            <strong>Thread - {currentChannel.name} </strong>
          </Typography>
        </Box>
        <Divider className={classes.vspaceTop} />
        <ListItem key={channelThread.message.id} className={classes.head}>
          <Box
            display="flex"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
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
                  <strong>{channelThread.message.user.username} </strong>
                  <i>{moment(channelThread.message.timestamp).fromNow()}</i>
                </Typography>
                <Divider className={classes.vspace} />
              </Box>
            </Box>
            <Typography component="div" className={classes.messageText}>
              {channelThread.message.text}
            </Typography>
          </Box>
        </ListItem>
        <Box className={classes.vspaceBottom}>
          <Typography component="div" className={classes.reply}>
            {messages.length}
            {messages.length === 1 ? ' reply' : ' replies'}
          </Typography>
        </Box>
      </React.Fragment>
    );
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
              {/* <Typography variant="caption">
                {showUpdate &&
                showUpdateMessageId === message.id &&
                user.sub === message.user.auth0_user_id ? (
                  ''
                ) : (
                  <DeleteMessage messageId={message.id} />
                )}
              </Typography> */}
            </Box>
          </Box>
          <Typography
            component="div"
            className={classes.messageText}
            onClick={() => handleShowUpdate(message)}
          >
            {/* {showUpdate &&
            showUpdateMessageId === message.id &&
            user.sub === message.user.auth0_user_id ? (
              <UpdateMessage message={message} />
            ) : (
              message.message
            )} */}
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
      {channelThread ? renderThreadInfo(channelThread) : ''}
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
