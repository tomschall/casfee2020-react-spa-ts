import React, { useEffect, useRef } from 'react';
import moment from 'moment';
import { isObject } from 'util';
import { Message } from '../../interfaces/message/message.interface';
import ThreadChannelButton from '../ThreadChannelButton';
import useStyles from './styles';
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

interface MessageProps {
  messages: Message[];
  lastMessage: any;
  preLastMessageId: number;
}

const MessageList: React.FC<MessageProps> = ({
  messages,
  lastMessage,
  preLastMessageId,
}) => {
  useEffect(() => {
    scrollToBottom();
  });

  const classes = useStyles();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (isObject(messagesEndRef) && messagesEndRef.current !== null) {
      messagesEndRef.current.scrollIntoView();
    }
  };

  const renderMessages = (message: Message) => {
    return (
      <React.Fragment>
        <ListItem key={message.id} className={classes.root}>
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
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Typography variant="caption">
                <strong>{message.user.username} </strong>
                <i>{moment(message.timestamp).fromNow()}</i>
              </Typography>
            </Box>
            <Typography component="p" className={classes.messageText}>
              {message.text}
            </Typography>
            <Divider className={classes.vspace} />
            <ThreadChannelButton
              message={message.id}
              channel_threads={message.channel_threads}
            />
          </Box>
        </ListItem>
      </React.Fragment>
    );
  };

  return (
    <>
      {[...messages]?.reverse()?.map((message) => renderMessages(message))}

      {lastMessage &&
      preLastMessageId !== 0 &&
      preLastMessageId < lastMessage.id
        ? renderMessages(lastMessage)
        : ''}

      <div ref={messagesEndRef} />
    </>
  );
};

export default MessageList;
