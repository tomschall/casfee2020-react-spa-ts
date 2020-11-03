import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Box } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useGetUserIsTypingSubscription } from '../../api/generated/graphql';
import { useRecoilState } from 'recoil';
import { currentChannelState } from '../../atom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  indicator: {
    color: '#f9cd8b',
    fontSize: '10px',
    fontWeight: 700,
  },
}));

const TypingIndicator: React.FC = () => {
  const classes = useStyles();
  const { user } = useAuth0();
  const [currentChannel, setCurrentChannel] = useRecoilState<any>(
    currentChannelState,
  );
  const { data, loading, error } = useGetUserIsTypingSubscription({
    variables: {
      self_id: user.sub,
      channel_id: currentChannel.id,
    },
  });

  if (error) {
    return <Alert severity="error">Typing Indicator Error...</Alert>;
  }

  return (
    <>
      <Box className={classes.indicator}>
        {!loading && data?.user_typing[0]?.username
          ? `${data.user_typing[0].username} is typing ...`
          : ''}
      </Box>
    </>
  );
};

export default TypingIndicator;
