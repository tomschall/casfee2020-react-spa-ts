import React, { useState } from 'react';
import { useWatchChannelsSubscription } from '../../api/generated/graphql';
import { Channel_Type_Enum } from '../../api/generated/graphql';
import { useRecoilState } from 'recoil';
import { currentChannelState } from '../../atom';
import {
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Loader from '../shared/Loader';
import PeopleIcon from '@material-ui/icons/People';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import EnhancedEncryptionOutlinedIcon from '@material-ui/icons/EnhancedEncryptionOutlined';
import UnreadMessageCounter from './UnreadMessageCounter';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useRouteMatch } from 'react-router-dom';
import { Channel } from '../../interfaces/channel.interface';
import { logToConsole } from '../../helpers/helpers';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  badge: {
    backgroundColor: '#0f0',
  },
}));

const Channels: React.FC = () => {
  const classes = useStyles();
  const [currentChannel] = useRecoilState<Channel>(currentChannelState);
  const [open, setOpen] = useState(true);
  const match = useRouteMatch(`/channel/${currentChannel?.name}`);

  const activeLink = () => {
    return match ? 'secondary' : 'primary';
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const { data, loading, error } = useWatchChannelsSubscription({
    variables: {
      channel_type: Channel_Type_Enum.ChatMessage,
    },
  });

  if (error) {
    logToConsole('Channels could not be loaded', error);
    return <Alert severity="error">Channels could not be loaded.</Alert>;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <List component="div" className={classes.root}>
        <ListItem button onClick={handleClick} aria-label="open channel list">
          <ListItemIcon>
            <PeopleOutlineIcon />
          </ListItemIcon>
          <ListItemText>
            <Typography variant="h6">Channels</Typography>
          </ListItemText>
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto">
          <List component="div">
            {data?.channels?.map((data, index) => (
              <ListItem
                key={index}
                button
                component={Link}
                to={'/channel/' + data.name}
                aria-label={`go to channel ${data.name}`}
              >
                {data?.id === currentChannel?.id ? (
                  <>
                    <ListItemIcon>
                      {data.is_private === true ? (
                        <EnhancedEncryptionOutlinedIcon color={activeLink()} />
                      ) : (
                        <PeopleIcon color={activeLink()} />
                      )}
                    </ListItemIcon>
                    <ListItemText>
                      <Typography variant="h6" color={activeLink()}>
                        {data.name}
                      </Typography>
                    </ListItemText>
                  </>
                ) : (
                  <>
                    <ListItemIcon>
                      {data.is_private === true ? (
                        <EnhancedEncryptionOutlinedIcon />
                      ) : (
                        <PeopleIcon />
                      )}
                    </ListItemIcon>
                    <ListItemText primary={data?.name} />
                    <UnreadMessageCounter channelId={data.id} />
                  </>
                )}
              </ListItem>
            ))}
          </List>
        </Collapse>
      </List>
    </>
  );
};

export default Channels;
