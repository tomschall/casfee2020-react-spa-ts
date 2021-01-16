import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Chip } from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/People';
import { useWatchUsersWhoHaveSubscribedToChannelSubscription } from '../../api/generated/graphql';
import Loader from './Loader';
import OnlineUserStatus from './OnlineUserStatus';
import { useAuth0 } from '@auth0/auth0-react';

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    width: 180,
    maxWidth: theme.spacing(22),
  },
}));

interface UserHeaderProps {
  channelId: number;
}

const UserHeader: React.FC<UserHeaderProps> = ({ channelId }) => {
  const classes = useStyles();
  const { user } = useAuth0();

  const { data, loading } = useWatchUsersWhoHaveSubscribedToChannelSubscription(
    {
      variables: {
        channel_id: channelId,
        user_id: user.sub,
      },
    },
  );

  if (loading) return <Loader />;

  return (
    <OnlineUserStatus
      user={data?.channel[0]?.user_channels[0]?.user}
      showBadgeOnly={true}
    >
      <Chip
        size="small"
        variant="outlined"
        color="primary"
        label={data?.channel[0]?.user_channels[0]?.user?.username}
        icon={<PeopleIcon />}
        className={classes.title}
        aria-label={`channel: ${data?.channel[0]?.user_channels[0]?.user?.username}`}
      />
    </OnlineUserStatus>
  );
};

export default UserHeader;
