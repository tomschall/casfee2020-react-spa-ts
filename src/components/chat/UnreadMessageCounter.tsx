import React, { useState, useEffect } from 'react';
import {
  useWatchGetMessagesIdsSubscription,
  useWatchMessageCursorSubscription,
} from '../../api/generated/graphql';
import { useAuth0 } from '@auth0/auth0-react';
import { Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { logToConsole } from '../../helpers/helpers';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  item: {
    height: '16px',
  },
}));

interface MessageId {
  id: number;
}

interface UnreadMessageCounterProps {
  channelId: number;
}

const UnreadMessageCounter: React.FC<UnreadMessageCounterProps> = ({
  channelId,
}) => {
  const classes = useStyles();
  const { user, error: auth0Error } = useAuth0();
  const [count, setCount] = useState<number | undefined>(0);

  const { data, loading, error } = useWatchGetMessagesIdsSubscription({
    variables: {
      channelId,
    },
    fetchPolicy: 'network-only',
  });

  const {
    data: useWatchMessageCursorData,
    loading: useWatchMessageCursorLoading,
    error: useWatchMessageCursorError,
  } = useWatchMessageCursorSubscription({
    variables: {
      user_id: user.sub,
      channel_id: channelId,
    },
  });

  useEffect(() => {
    let messageId =
      useWatchMessageCursorData?.message_cursor[0]?.message_id ?? null;

    let messageCounterArray = data?.messages.filter((m: MessageId) => {
      if (messageId === null) return false;
      return m.id > messageId;
    });

    setCount(messageCounterArray?.length);
  }, [data, useWatchMessageCursorData]);

  if (error || useWatchMessageCursorError || auth0Error) {
    logToConsole(
      'Error in UnreadMessageCounter component',
      error,
      useWatchMessageCursorError,
      auth0Error,
    );
  }

  if (loading || useWatchMessageCursorLoading) {
    return <React.Fragment></React.Fragment>;
  }

  return (
    <>
      {count && count !== undefined ? (
        <div className={classes.root}>
          <Chip
            variant="outlined"
            size="small"
            label={count}
            color="secondary"
            className={classes.item}
          />
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default UnreadMessageCounter;
