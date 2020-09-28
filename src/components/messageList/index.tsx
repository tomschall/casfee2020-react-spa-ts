import React, { useEffect, useRef } from 'react';
import moment from 'moment';
import { isObject } from 'util';
import { Message } from '../../interfaces/message/message.interface';
import ChannelThread from '../ChannelThread';
import useStyles from './styles';
import {
  Avatar,
  Box,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  Badge,
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

  const renderAvatar = (user: any) => {
    let image;
    if (user === 'roli') {
      image = 'https://placeimg.com/50/50/people?1';
    } else {
      image = 'https://placeimg.com/50/50/people?2';
    }
    return image;
  };

  const renderMessages = (message: Message) => {
    return (
      <ListItem key={message.id} className={classes.root}>
        <ListItemAvatar>
          <ListItemIcon>
            <Badge variant="dot">
              <Avatar alt="Username" src={renderAvatar(message.user)} />
            </Badge>
          </ListItemIcon>
        </ListItemAvatar>
        <Box component="div" display="flex" flexDirection="column" flex="1">
          <Typography variant="caption">
            {message.user.username} <i>{moment(message.timestamp).fromNow()}</i>
          </Typography>
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
