import React, { useState, useEffect } from 'react';
import { Grid, List, Button } from '@material-ui/core';
import MessageList from './MessageList';
import PublishChannelPolling from '../adminPollings/PublishPollQuestion';
import { Message } from '../../interfaces/message/message.interface';
import {
  useWatchMessagesSubscription,
  Channel_Type_Enum,
  useUpsertMessageCursorMutation,
} from '../../api/generated/graphql';

import { Box } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import MenuBar from '../shared/MenuBar';
import { useHistory } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    overflowY: 'scroll',
    height: '75vh',
    marginTop: theme.spacing(5),
  },
  messageContainer: {
    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(10),
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(0),
    },
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(3),
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(0),
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0),
      paddingTop: theme.spacing(0),
      paddingBottom: theme.spacing(0),
    },
  },
}));

interface ChatProps {
  channelId: number;
  isPrivate: boolean;
  channelType: Channel_Type_Enum;
}

const Chat: React.FC<ChatProps> = ({ channelId, isPrivate, channelType }) => {
  const classes = useStyles();
  const [limit, setLimit] = useState(20);
  const [lastMessage, setLastMessage] = useState({});
  const { user, error: auth0Error } = useAuth0();
  let history = useHistory();

  let preLastMessageId = 0;

  const { data, loading, error } = useWatchMessagesSubscription({
    variables: {
      channelId: channelId,
      limit: limit,
    },
    fetchPolicy: 'network-only',
  });

  const [
    upsertMessageCursorMutation,
    {
      data: upsertMessageData,
      loading: upsertMessageLoading,
      error: upsertMessageError,
    },
  ] = useUpsertMessageCursorMutation({
    variables: {
      channel_id: channelId,
      message_id: data?.messages[0]?.id ?? 0,
      user_id: user.sub,
    },
  });

  useEffect(() => {
    if (data?.messages[0]?.id && data.messages[0].id > 0)
      upsertMessageCursorMutation();
  }, [data]);

  if (error) {
    console.log('messages error', error);
    return <Alert severity="error">Messages could not be loaded.</Alert>;
  }

  if (loading) {
    return <CircularProgress />;
  }

  if (data) {
    preLastMessageId = data?.messages[0]?.id;
  }

  const handleIncreaseLimit = () => {
    setLimit(limit + 20);
  };

  const handleSetLastMessage = (lastMessage: Message) => {
    setLastMessage(lastMessage);
  };

  const navigateToAddChannelMembers = () => {
    history.push(`/addChannelMembers`);
  };

  return (
    <>
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={12} className={classes.messageContainer}>
            <PublishChannelPolling />
          </Grid>
          <Grid item xs={12} className={classes.messageContainer}>
            {isPrivate && channelType !== Channel_Type_Enum.DirectMessage && (
              <Button type="button" onClick={navigateToAddChannelMembers}>
                Add users to channel
              </Button>
            )}
            <List>
              <MessageList
                messages={data?.messages as Message[]}
                lastMessage={lastMessage}
                preLastMessageId={preLastMessageId}
              />
            </List>
          </Grid>
          <Box maxWidth="xl" component="nav">
            <MenuBar
              channelId={channelId}
              handleSetLastMessage={handleSetLastMessage}
              preLastMessageId={preLastMessageId}
            />
          </Box>
        </Grid>
      </div>
    </>
  );
};

export default Chat;
