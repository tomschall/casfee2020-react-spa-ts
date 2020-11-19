import React from 'react';
import moment from 'moment';
import { ThreadMessage } from '../../../interfaces/message.interface';
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

interface ThreadInfoProps {
  messages: ThreadMessage[];
  channelThread: any;
  currentChannel: any;
}

const ThreadInfo: React.FC<ThreadInfoProps> = ({
  messages,
  channelThread,
  currentChannel,
}) => {
  const classes = useStyles();

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

  return <>{channelThread ? renderThreadInfo(channelThread) : ''}</>;
};

export default ThreadInfo;
