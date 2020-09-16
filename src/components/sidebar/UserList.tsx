import React from 'react';
import { Link } from 'react-router-dom';
import { useWatchDirectMessageChannelsSubscription } from '../../api/generated/graphql';
import CircularProgress from '@material-ui/core/CircularProgress';
import { List, ListItem, ListItemText } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { Channel_Type_Enum } from '../../api/generated/graphql';

interface UserListProps {
  user_id: string;
}

const UserList: React.FC<any> = ({ user_id }) => {
  console.log('user', user_id);
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
    return <CircularProgress />;
  }

  if (data) {
    console.log('data UserList', data);
  }

  return (
    <React.Fragment>
      Users:
      <List component="nav" aria-label="secondary mailbox folders">
        {data?.channels.map((data: any) => (
          <ListItem button key={data.id}>
            <ListItemText
              primary={
                <Link to={'/channel/' + data.name}>
                  {
                    data.user_channels?.filter(
                      (el: any) => el.user.auth0_user_id !== user_id,
                    )[0]?.user.username
                  }
                </Link>
              }
            />
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );
};

export default UserList;
