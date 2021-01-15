import React from 'react';
import moment from 'moment';
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
import { makeStyles } from '@material-ui/core/styles';
import { Channel } from '../../../interfaces/channel.interface';
import { ChannelThread } from '../../../interfaces/thread.interface';

const useStyles = makeStyles((theme) => ({
  head: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: theme.spacing(0),
  },
  [theme.breakpoints.up('md')]: {
    messageText: {
      paddingBottom: '1rem',
      color: 'rgba(255, 255, 255, 0.7)',
    },
  },
  [theme.breakpoints.down('md')]: {
    messageText: {
      paddingBottom: '1rem',
      color: 'rgba(255, 255, 255, 0.7)',
    },
  },
  [theme.breakpoints.down('sm')]: {
    messageText: {
      paddingBottom: '1rem',
      color: 'rgba(255, 255, 255, 0.7)',
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
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    backgroundColor: '#000000',
    color: '#ffffff',
    fontSize: 11,
    fontWeight: 'bold',
    border: '2px solid #f57c00',
  },
  avatarDeleted: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    backgroundColor: '#000000',
    color: '#ffffff',
    fontSize: 11,
    fontWeight: 'bold',
    border: '2px solid #f57c00',
  },
  image: {
    paddingBottom: '0.5rem',
  },
  giphy: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    [theme.breakpoints.up('md')]: {
      width: '25%',
    },
  },
}));

interface ThreadInfoProps {
  channelThread: ChannelThread;
  currentChannel: Channel | { id: number; name: string };
  showThreadInfo?: boolean;
}

const ThreadInfo: React.FC<ThreadInfoProps> = ({
  channelThread,
  currentChannel,
  showThreadInfo,
}) => {
  const classes = useStyles();

  const renderThreadInfo = (channelThread: ChannelThread) => {
    return (
      <>
        {showThreadInfo && (
          <Box display="flex" justifyContent="center" alignItems="center">
            <Chip
              variant="outlined"
              size="small"
              color="primary"
              label={<strong>Thread - {currentChannel.name} </strong>}
            />
          </Box>
        )}
        <Divider className={classes.vspaceTop} />
        <ListItem
          key={channelThread.message.id}
          component="div"
          className={classes.head}
        >
          <Box
            display="flex"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <ListItemAvatar>
              <ListItemIcon>
                <Badge variant="dot">
                  {!channelThread.message.deleted ? (
                    <Avatar className={classes.avatar}>
                      {channelThread.message.user.username
                        .substring(0, 2)
                        .toUpperCase()}
                    </Avatar>
                  ) : (
                    <Avatar
                      className={classes.avatarDeleted}
                      alt="Message has been removed"
                    >
                      !!!
                    </Avatar>
                  )}
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
                <Typography color="secondary" variant="caption">
                  {!channelThread.message.deleted ? (
                    <>
                      <strong>{channelThread.message.user.username} </strong>
                    </>
                  ) : (
                    <strong>Oh sorry it seems...</strong>
                  )}
                </Typography>
                <Typography
                  variant="caption"
                  color="primary"
                  style={{ marginLeft: '8px' }}
                >
                  <i>{moment(channelThread.message.timestamp).fromNow()}</i>
                </Typography>
                <Divider className={classes.vspace} />
              </Box>
            </Box>
            <Typography component="div" className={classes.messageText}>
              {channelThread.message.text}
            </Typography>
            {channelThread.message?.image ? (
              <Box className={classes.image}>
                <img
                  alt={channelThread.message.image}
                  src={channelThread.message.image}
                  className={classes.giphy}
                />
              </Box>
            ) : (
              ''
            )}
          </Box>
        </ListItem>
      </>
    );
  };

  return <>{renderThreadInfo(channelThread)}</>;
};

export default ThreadInfo;
