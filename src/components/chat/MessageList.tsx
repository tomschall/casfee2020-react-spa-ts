import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import { Message } from '../../interfaces/message.interface';
import ThreadReply from './threads/ThreadReply';
import ThreadReplyIn from './threads/ThreadReplyIn';
import DeleteMessage from './DeleteMessage';
import UpdateMessage from './UpdateMessage';
import ReplaceMessage from './ReplaceMessage';
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
import { useParams } from 'react-router';
import { ChatParams } from '../../interfaces/param.interface';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: theme.spacing(2),

    [theme.breakpoints.down('md')]: {
      paddingTop: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingLeft: theme.spacing(2),
      paddingBottom: theme.spacing(0),
    },
  },
  [theme.breakpoints.up('md')]: {
    messageText: {
      paddingBottom: '1rem',
    },
  },
  [theme.breakpoints.down('md')]: {
    messageText: {
      paddingBottom: '.3rem',
    },
  },
  vspace: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),

    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(0),
    },
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
  avatar: {
    backgroundColor: '#0a0e33',
    color: '#F57C00',
    fontSize: 12,
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
  const classes = useStyles();
  const [showUpdate, setShowUpdate] = useState<boolean>(false);
  const [showUpdateMessageId, setShowUpdateMessageId] = useState<number | null>(
    null,
  );

  const { channel: channelName } = useParams<ChatParams>();

  const deletedMessage = useRecoilValue<boolean>(deletedMessageState);

  const handleShowUpdate = (message: Message) => {
    if (message.user.auth0_user_id !== user.sub) return;
    setShowUpdateMessageId(message.id);
    setShowUpdate(!showUpdate);
  };

  const renderMessage = (message: Message) => {
    return (
      <ListItem key={message.id} className={classes.root}>
        <ListItemAvatar>
          <ListItemIcon>
            <Badge variant="dot">
              {!message.deleted ? (
                <Avatar className={classes.avatar}>
                  {message.user.username.substring(0, 2).toUpperCase()}
                </Avatar>
              ) : (
                <Avatar
                  alt="Message has been removed"
                  src={`${window.location.origin}/deleted.png`}
                />
              )}
            </Badge>
          </ListItemIcon>
        </ListItemAvatar>

        <Box component="div" display="flex" flexDirection="column" flex="1">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box
              component="div"
              display="flex"
              justifyContent="space-between"
              flexGrow="1"
              style={{ marginRight: 16 }}
            >
              <Typography color="secondary" variant="caption">
                {!message.deleted ? (
                  <>
                    <strong>{message.user.username} </strong>
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
                {moment(message.timestamp).fromNow()}
              </Typography>
            </Box>
            <Box>
              <Box
                display="flex"
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                <Typography variant="caption">
                  <ThreadReply message={message} channelName={channelName} />
                </Typography>
                {/* {!message.deleted ? (
                  <React.Fragment>
                    {user.sub === message.user.auth0_user_id && (
                      <Typography variant="caption">
                        {!(
                          showUpdate && showUpdateMessageId === message.id
                        ) && (
                          <>
                            {message.channel_threads.length ? (
                              <ReplaceMessage messageId={message.id} />
                            ) : (
                              <DeleteMessage messageId={message.id} />
                            )}
                          </>
                        )}
                      </Typography>
                    )}
                  </>
                ) : (
                  ''
                )} */}
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
            user.sub === message.user.auth0_user_id &&
            message.deleted === false ? (
              <UpdateMessage message={message} />
            ) : (
              message.text
            )}
          </Typography>
          {message?.image ? (
            <Box className={classes.image}>
              <img src={message.image} className={classes.giphy} />
            </Box>
          ) : (
            ''
          )}
          {/* {message?.channel_threads?.length &&
          message?.channel_threads[0]?.channel_thread_messages_aggregate
            .aggregate.count >= 1 ? (
            <Box>
              <ThreadReplyIn message={message} channelName={channelName} />
            </Box>
          ) : (
            ''
          )} */}
          <Divider className={classes.vspace} />
        </Box>
      </ListItem>
    );
  };

  return (
    <>
      {[...messages]?.reverse()?.map((message, i) => renderMessage(message))}

      {!deletedMessage &&
      lastMessage &&
      preLastMessageId !== 0 &&
      preLastMessageId < lastMessage.id
        ? renderMessage(lastMessage)
        : ''}
    </>
  );
};

export default MessageList;
