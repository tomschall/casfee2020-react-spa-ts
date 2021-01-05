import React from 'react';
import moment from 'moment';
import { ThreadMessage } from '../../../interfaces/message.interface';
import ThreadInfo from './ThreadInfo';
import ThreadDeleteMessage from './ThreadDeleteMessage';
import {
  Avatar,
  Badge,
  Box,
  Divider,
  FormHelperText,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  Typography,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: theme.spacing(2),
    overflowWrap: 'break-word',
    wordBreak: 'break-all',
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
  avatar: {
    backgroundColor: '#f57c00',
    color: '#000000',
  },
  loadMoreButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(1),
  },
}));

interface ThreadMessageListProps {
  messages: ThreadMessage[];
  user: any;
  channelThread: any;
  currentChannel: any;
  handleIncreaseLimit: any;
  limit: number;
  showThreadInfo?: boolean;
}

const ThreadMessageList: React.FC<ThreadMessageListProps> = ({
  messages,
  user,
  channelThread,
  currentChannel,
  handleIncreaseLimit,
  limit,
  showThreadInfo,
}) => {
  const classes = useStyles();

  const renderMessage = (message: ThreadMessage) => {
    return (
      <ListItem key={message.id} component="div" className={classes.root}>
        <ListItemAvatar>
          <ListItemIcon>
            <Badge variant="dot">
              <Avatar className={classes.avatar}>
                {message.user.username.substring(0, 2).toUpperCase()}
              </Avatar>
            </Badge>
          </ListItemIcon>
        </ListItemAvatar>

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
              <img alt="Giphy Image" src={message.image} />
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
        showThreadInfo={showThreadInfo}
      />
      <Box className={classes.loadMoreButton}>
        {messages?.length === limit && (
          <Button
            onClick={() => handleIncreaseLimit()}
            aria-label="load more messages"
          >
            load more (+{limit})
          </Button>
        )}
      </Box>

      {messages
        ? [...messages]
            ?.reverse()
            ?.map((message: ThreadMessage) => renderMessage(message))
        : ''}
    </>
  );
};

export default ThreadMessageList;
