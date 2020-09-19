import React from 'react';
import { Link } from 'react-router-dom';
import { useWatchChannelsSubscription } from '../../api/generated/graphql';
import CircularProgress from '@material-ui/core/CircularProgress';
import { List, ListItem, ListItemText } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { Channel_Type_Enum } from '../../api/generated/graphql';

const ChannelList: React.FC<any> = () => {
  const { data, loading, error } = useWatchChannelsSubscription({
    variables: {
      channel_type: Channel_Type_Enum.ChatMessage,
    },
  });

  if (error) {
    return <Alert severity="error">Channels could not be loaded.</Alert>;
  }

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <List component="nav" aria-label="secondary mailbox folders">
      {data?.channels.map((data: any) => (
        <ListItem button key={data.id}>
          <ListItemText
            primary={
              <Link to={'/channel/' + data.name}>
                {data.is_private === true ? (
                  <i className="material-icons">lock </i>
                ) : (
                  ' '
                )}
                {data.name}
              </Link>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export default ChannelList;
