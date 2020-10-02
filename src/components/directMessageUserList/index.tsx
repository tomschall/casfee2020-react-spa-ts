import React from 'react';
import {
  Avatar,
  Badge,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import PersonIcon from '@material-ui/icons/Person';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import useStyles from './styles';
import Loader from '../../layout/shared/Loader';
import { useWatchOnlineUsersSubscription } from '../../api/generated/graphql';

import { Link, useHistory } from 'react-router-dom';
import { useWatchDirectMessageChannelsSubscription } from '../../api/generated/graphql';
import CircularProgress from '@material-ui/core/CircularProgress';

import Alert from '@material-ui/lab/Alert';
import { Channel_Type_Enum } from '../../api/generated/graphql';

interface DirectMessageUserListProps {
  user_id: string;
}

const DirectMessageUserList: React.FC<DirectMessageUserListProps> = ({
  user_id,
}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  let history = useHistory();

  const {
    data: onlineUsers,
    loading: onlineUsersLoading,
    error: onlineUsersError,
  } = useWatchOnlineUsersSubscription();

  const { data, loading, error } = useWatchDirectMessageChannelsSubscription({
    variables: {
      channel_type: Channel_Type_Enum.DirectMessage,
      user_id,
    },
  });

  if (error || onlineUsersError) {
    console.log('error', error);
    console.log('onlineUsersError', onlineUsersError);
    return (
      <Alert severity="error">A DirectMessageUserListError occured.</Alert>
    );
  }

  if (loading) {
    return <Loader />;
  }

  const handleClick = () => {
    setOpen(!open);
  };

  const navigateToAddDirectMessageChannelMembers = () => {
    history.push(`/addDirectMessageChannelMembers`);
  };

  const setOnlineUsersStatus = (user_id: any) => {
    if (user_id === undefined) return true;
    const onlineUser = onlineUsers?.users.filter((u) => {
      return user_id === u.auth0_user_id ? true : false;
    });

    return onlineUser?.length ? false : true;
  };

  return (
    <>
      <List className={classes.root}>
        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <Badge classes={{ badge: classes.badge }} variant="dot">
              <PersonIcon />
            </Badge>
          </ListItemIcon>
          <ListItemText>
            <Typography variant="h6">Direct Messages</Typography>
          </ListItemText>
          <ListItemIcon>
            <AddCircleOutlineIcon
              onClick={navigateToAddDirectMessageChannelMembers}
            />
          </ListItemIcon>
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div">
            {data?.channels.map((data: any) => {
              const onlineUser = setOnlineUsersStatus(
                data.user_channels[0]?.user.auth0_user_id,
              );
              return (
                <ListItem button key={data.id}>
                  <ListItemText
                    primary={
                      <Link
                        className={classes.link}
                        to={'/channel/' + data.name}
                      >
                        {data.user_channels[0]?.user.username}
                      </Link>
                    }
                  />
                  <ListItemIcon>
                    <Badge
                      classes={{ badge: classes.badge }}
                      variant="dot"
                      invisible={onlineUser}
                    >
                      <Avatar alt="Username" src="/chicken-chat-logo.svg" />
                    </Badge>
                  </ListItemIcon>
                </ListItem>
              );
            })}
          </List>
        </Collapse>
      </List>
    </>
  );
};

export default DirectMessageUserList;
