import React, { useState, useEffect } from 'react';
import {
  useWatchMessagesSubscription,
  useWatchMessageCursorSubscription,
} from '../../api/generated/graphql';
import { useRecoilState } from 'recoil';
import { currentChannelState } from '../../atom';
import { useAuth0 } from '@auth0/auth0-react';
import Alert from '@material-ui/lab/Alert';
import { Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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

interface ChannelListMessageCounterProps {
  channelId: number;
}

const ChannelListMessageCounter: React.FC<ChannelListMessageCounterProps> = ({
  channelId,
}) => {
  const classes = useStyles();
  const [currentChannel] = useRecoilState<any>(currentChannelState);
  const { user, error: auth0Error } = useAuth0();
  const [count, setCount] = useState<number | undefined>(0);

  const { data, loading, error } = useWatchMessagesSubscription({
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
    let messageId = useWatchMessageCursorData?.message_cursor[0]?.message_id
      ? useWatchMessageCursorData?.message_cursor[0]?.message_id
      : 0;

    let messageCounterArray = data?.messages.filter((m) => {
      if (messageId === 0) return false;
      return m.id > messageId;
    });

    setCount(messageCounterArray?.length);
  }, [data, useWatchMessageCursorData]);

  if (
    error ||
    !currentChannel?.name ||
    useWatchMessageCursorError ||
    auth0Error
  ) {
    return (
      <Alert severity="error">
        Error in ChannelListMessageCounter Component
      </Alert>
    );
  }

  if (loading || useWatchMessageCursorLoading) {
    return <React.Fragment></React.Fragment>;
  }

  return (
    <>
      {count && count > 0 ? (
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

export default ChannelListMessageCounter;
