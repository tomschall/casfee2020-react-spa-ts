import React, { useEffect, useRef } from 'react';
import moment from 'moment';
import { isObject } from 'util';
import { Message } from '../../interfaces/message/message.interface';
import ChannelThread from '../ChannelThread';
import useStyles from './styles';
import {
  Avatar,
  Badge,
  Box,
  Chip,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  Typography,
} from '@material-ui/core';

import FaceIcon from '@material-ui/icons/Face';

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

  const renderAvatar = (user: any) => {
    let image;
    if (user === 'webrooster') {
      image = 'https://placeimg.com/50/50/people?1';
    } else {
      image = 'https://placeimg.com/50/50/people?2';
    }
    return image;
  };

  const renderMessages = (message: Message) => {
    return (
      <ListItem key={message.id} className={classes.root}>
        <Box display="flex" justifyContent="flex-start" alignItems="flex-start">
          <ListItemAvatar>
            <ListItemIcon>
              <Badge variant="dot">
                <Avatar alt="Username" src={renderAvatar(message.user)} />
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
          <ChannelThread
            message={message.id}
            channel_threads={message.channel_threads}
          />
        </Box>
      </ListItem>
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
