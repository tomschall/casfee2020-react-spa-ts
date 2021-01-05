import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useRecoilState } from 'recoil';
import { Chip } from '@material-ui/core';
import { currentChannelState } from '../../atom';
import PeopleIcon from '@material-ui/icons/People';
import { useWatchUsersWhoHaveSubscribedToChannelSubscription } from '../../api/generated/graphql';

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    width: 180,
    maxWidth: theme.spacing(22),
  },
}));

interface UserHeaderProps {
  user: string;
  channelId: number;
}

const UserHeader: React.FC<UserHeaderProps> = ({ user, channelId }) => {
  const classes = useStyles();

  const {
    data,
    loading,
    error,
  } = useWatchUsersWhoHaveSubscribedToChannelSubscription({
    variables: {
      channel_id: channelId,
      user_id: user,
    },
  });

  return (
    <Chip
      size="small"
      variant="outlined"
      color="primary"
      label={data?.channel[0]?.user_channels[0]?.user?.username}
      icon={<PeopleIcon />}
      className={classes.title}
      aria-label={`channel: ${data?.channel[0]?.user_channels[0]?.user?.username}`}
    />
  );
};

export default UserHeader;
