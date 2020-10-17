import React, { useState, useEffect } from 'react';
import { Grid, List, Button } from '@material-ui/core';
import MessageList from '../MessageList';
import { Message } from '../../interfaces/message/message.interface';
import {
  useWatchMessagesSubscription,
  Channel_Type_Enum,
  useUpsertMessageCursorMutation,
} from '../../api/generated/graphql';

import { Box } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import MenuBar from '../../layout/shared/MenuBar';
import useStyles from './styles';
import { useHistory } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

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

  // console.log('data.messages', data?.messages[0]);

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
      message_id: data?.messages[0]?.id ? data?.messages[0].id : 0,
      user_id: user.sub,
    },
  });

  useEffect(() => {
    console.log('data?.messages[0].id', data?.messages[0]?.id);
    if (data?.messages[0]?.id && data?.messages[0].id > 0)
      upsertMessageCursorMutation();
  }, [data]);

  if (error) {
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
    console.log('triggered handleSetLastMessage');
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
