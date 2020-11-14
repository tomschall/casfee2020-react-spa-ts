import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import { isObject } from 'util';
import { Message } from '../../interfaces/message/message.interface';
import ThreadReply from './threads/ThreadReply';
import ThreadReplyIn from './threads/ThreadReplyIn';
import DeleteMessage from './DeleteMessage';
import UpdateMessage from './UpdateMessage';
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
import { deletedMessageState } from '../../atom';

const useStyles = makeStyles((theme) => ({
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
  },
  [theme.breakpoints.down('md')]: {
    messageText: {
      fontSize: 14,
      paddingBottom: '1rem',
    },
  },
  [theme.breakpoints.down('sm')]: {
    messageText: {
      fontSize: 12,
      paddingBottom: '1rem',
    },
  },
  vspace: {
    marginBottom: theme.spacing(1),
  },
  image: {
    paddingBottom: '0.5rem',
  },
}));

interface MessageProps {
  messages: Message[];
  lastMessage: any;
  preLastMessageId: number;
  user: any;
}

const MessageList: React.FC<MessageProps> = ({
  messages,
  lastMessage,
  preLastMessageId,
  user,
}) => {
  useEffect(() => {
    scrollToBottom();
  });

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

  const handleShowUpdate = (message: Message) => {
    if (message.user.auth0_user_id !== user.sub) return;
    setShowUpdateMessageId(message.id);
    setShowUpdate(!showUpdate);
  };

  const renderMessages = (message: Message) => {
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
              <Box
                display="flex"
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                <Typography variant="caption">
                  <ThreadReply message={message} />
                </Typography>
                <Typography variant="caption">
                  {showUpdate &&
                  showUpdateMessageId === message.id &&
                  user.sub === message.user.auth0_user_id ? (
                    ''
                  ) : (
                    <DeleteMessage messageId={message.id} />
                  )}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Typography
            component="div"
            className={classes.messageText}
            onClick={() => handleShowUpdate(message)}
          >
            {showUpdate &&
            showUpdateMessageId === message.id &&
            user.sub === message.user.auth0_user_id ? (
              <UpdateMessage message={message} />
            ) : (
              message.text
            )}
          </Typography>
          {message?.image ? (
            <Box className={classes.image}>
              <img src={message.image} />
            </Box>
          ) : (
            ''
          )}
          {message?.channel_threads?.length ? (
            <Box>
              <ThreadReplyIn message={message} />
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
      {[...messages]?.reverse()?.map((message, i) => renderMessages(message))}

      {!deletedMessage &&
      lastMessage &&
      preLastMessageId !== 0 &&
      preLastMessageId < lastMessage.id
        ? renderMessages(lastMessage)
        : ''}

      <div ref={messagesEndRef} />
    </>
  );
};

export default MessageList;
