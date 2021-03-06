import React, { useState, useRef, useEffect } from 'react';
import moment, { Moment } from 'moment';
import { Message } from '../../interfaces/message.interface';
import ThreadReply from './threads/ThreadReply';
import ThreadReplyIn from './threads/ThreadReplyIn';
import DeleteMessageWrapper from './DeleteMessageWrapper';
import UpdateMessage from './UpdateMessage';
import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  List,
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
import { Auth0User } from '../../interfaces/user.interface';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: '90px',
    overflowY: 'scroll',
  },
  listItem: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: theme.spacing(2),
    overflowWrap: 'break-word',
    hyphens: 'auto',
    textOverflow: 'ellipsis',

    [theme.breakpoints.down('md')]: {
      paddingTop: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingLeft: theme.spacing(2),
      paddingBottom: theme.spacing(0),
    },
  },
  messageText: {
    color: '#fff',
  },
  [theme.breakpoints.up('md')]: {
    messageText: {
      padding: '1rem',
      paddingLeft: '0rem',
      '&:hover': {
        cursor: 'pointer',
      },
    },
  },
  [theme.breakpoints.down('md')]: {
    messageText: {
      padding: '1rem',
      paddingLeft: '0rem',
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
  loadMoreButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(2),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(3),
  },
  divider: {
    flex: 1,
  },
  date: {
    marginRight: '5px',
    color: '#ffffff',
    fontWeight: 500,
  },
  time: {
    color: '#ffffff',
    fontWeight: 500,
  },
}));

interface MessageProps {
  messages: Message[];
  lastMessage: Message | null;
  preLastMessageId: number | null;
  user: Auth0User;
  handleIncreaseLimit: () => void;
  limit: number;
  setRef: React.Dispatch<
    React.SetStateAction<React.RefObject<HTMLDivElement> | null>
  >;
  setDoScroll: React.Dispatch<React.SetStateAction<boolean>>;
  delayAfterScrolling: () => void;
}

const MessageList: React.FC<MessageProps> = ({
  messages,
  lastMessage,
  preLastMessageId,
  user,
  handleIncreaseLimit,
  limit,
  setRef,
  setDoScroll,
  delayAfterScrolling,
}) => {
  const classes = useStyles();
  const [showUpdate, setShowUpdate] = useState<boolean>(false);
  const [showUpdateMessageId, setShowUpdateMessageId] = useState<number | null>(
    null,
  );
  const { channel: channelName } = useParams<ChatParams>();
  const deletedMessage = useRecoilValue<boolean>(deletedMessageState);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleShowUpdate = (message: Message) => {
    if (message?.user?.auth0_user_id !== user.sub) return;
    setShowUpdateMessageId(message.id);
    setShowUpdate(!showUpdate);
  };

  const handleScroll = () => {
    setDoScroll(true);
    delayAfterScrolling();
  };

  useEffect(() => {
    setRef(messagesEndRef);
  }, [setRef, messagesEndRef]);

  const formatDate = (timestamp: Date | Moment) => {
    const now = moment();
    const duration = moment.duration(now.diff(timestamp)).asHours();
    if (duration > 12) {
      return (
        <>
          <span className={classes.date}>
            {moment(timestamp).format(`Do, MMM`)}
          </span>
          <span className={classes.time}>
            {moment(timestamp).format(`h:mm`)}
          </span>
        </>
      );
    }
    return <span className={classes.date}>{moment(timestamp).fromNow()}</span>;
  };

  const renderMessage = (message: Message) => {
    return (
      <ListItem key={message.id} component="div" className={classes.listItem}>
        <ListItemAvatar>
          <ListItemIcon
            aria-label={message?.user?.username.substring(0, 2).toUpperCase()}
          >
            <Badge variant="dot">
              {!message.deleted ? (
                <Avatar className={classes.avatar}>
                  {message?.user?.username.substring(0, 2).toUpperCase()}
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
                    <strong>{message?.user?.username} </strong>
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
                {formatDate(message.timestamp)}
              </Typography>
            </Box>
            <Box>
              <Box
                display="flex"
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                <ThreadReply message={message} channelName={channelName} />

                {!message.deleted ? (
                  <React.Fragment>
                    {user.sub === message?.user?.auth0_user_id && (
                      <Typography variant="caption">
                        {!(
                          showUpdate && showUpdateMessageId === message.id
                        ) && <DeleteMessageWrapper messageId={message.id} />}
                      </Typography>
                    )}
                  </React.Fragment>
                ) : (
                  ''
                )}
              </Box>
            </Box>
          </Box>

          <Typography
            component="p"
            className={classes.messageText}
            onClick={() => handleShowUpdate(message)}
          >
            {showUpdate &&
            showUpdateMessageId === message.id &&
            user.sub === message?.user?.auth0_user_id &&
            message.deleted === false ? (
              <UpdateMessage message={message} />
            ) : (
              message.text
            )}
          </Typography>
          {message?.image ? (
            <Box className={classes.image}>
              <img
                alt={message.image}
                src={message.image}
                className={classes.giphy}
              />
            </Box>
          ) : (
            ''
          )}
          <Box>
            <ThreadReplyIn message={message} channelName={channelName} />
          </Box>
          <Divider className={classes.vspace} />
        </Box>
      </ListItem>
    );
  };

  return (
    <>
      <List
        id="message-list"
        component="div"
        className={classes.root}
        onScroll={handleScroll}
      >
        {messages?.length === limit && (
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            className={classes.loadMoreButton}
            component="div"
          >
            <Divider className={classes.divider} />
            <Button
              onClick={() => handleIncreaseLimit()}
              aria-label="load more messages"
            >
              load more (+{limit})
            </Button>
            <Divider className={classes.divider} />
          </Box>
        )}

        {[...messages]?.reverse()?.map((message) => renderMessage(message))}

        {!deletedMessage &&
        lastMessage &&
        preLastMessageId !== 0 &&
        preLastMessageId &&
        preLastMessageId < lastMessage.id
          ? renderMessage(lastMessage)
          : ''}

        <div ref={messagesEndRef}></div>
      </List>
    </>
  );
};

export default MessageList;
