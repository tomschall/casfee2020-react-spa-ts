import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Badge, Chip, Container, Grid, Tooltip, Box } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import PeopleIcon from '@material-ui/icons/People';
import FaceIcon from '@material-ui/icons/Face';
import Loader from '../../layout/shared/Loader';
import { useGetUserIsTypingSubscription } from '../../api/generated/graphql';
import useStyles from './styles';
import { useRecoilState } from 'recoil';
import { currentChannelState } from '../../atom';

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
