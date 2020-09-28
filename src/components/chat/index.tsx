import React, { useState, useEffect } from 'react';
import { Grid, List } from '@material-ui/core';
import MessageList from '../messageList';
import { Message } from '../../interfaces/message/message.interface';
import { useWatchMessagesSubscription } from '../../api/generated/graphql';

import { Box } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import MenuBar from '../../layout/shared/MenuBar';
import useStyles from './styles';

interface ChatProps {
  channelId: number;
}

const Chat: React.FC<ChatProps> = ({ channelId }) => {
  const classes = useStyles();
  const [limit, setLimit] = useState(20);
  const [lastMessage, setLastMessage] = useState({});

  let preLastMessageId = 0;

  const { data, loading, error } = useWatchMessagesSubscription({
    variables: {
      channelId: channelId,
      limit: limit,
    },
    fetchPolicy: 'network-only',
  });

  console.log(data);

  useEffect(() => {
    setLastMessage({});
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

  return (
    <>
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={12}>
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
