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
import Alert from '@material-ui/lab/Alert';
import PersonIcon from '@material-ui/icons/Person';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Loader from '../../layout/shared/Loader';

import { Link, useHistory } from 'react-router-dom';
import { useWatchDirectMessageChannelsSubscription } from '../../api/generated/graphql';
import { Channel_Type_Enum } from '../../api/generated/graphql';

import useStyles from './styles';

interface UsersListProps {
  user_id: string;
}

const UsersList: React.FC<UsersListProps> = ({ user_id }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  let history = useHistory();

  const { data, loading, error } = useWatchDirectMessageChannelsSubscription({
    variables: {
      channel_type: Channel_Type_Enum.DirectMessage,
      user_id,
    },
  });

  if (error) {
    console.log('error', error);
    return <Alert severity="error">Channels could not be loaded.</Alert>;
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
            {data?.channels.map((data: any) => (
              <ListItem button key={data.id}>
                <ListItemText
                  primary={
                    <Link className={classes.link} to={'/channel/' + data.name}>
                      {data.user_channels[0]?.user.username}
                    </Link>
                  }
                />
                <ListItemIcon>
                  <Badge
                    classes={{ badge: classes.badge }}
                    variant="dot"
                    // invisible
                  >
                    <Avatar alt="Username" src="/chicken-chat-logo.svg" />
                  </Badge>
                </ListItemIcon>
              </ListItem>
            ))}
          </List>
        </Collapse>
      </List>
    </>
  );
};

export default UsersList;
