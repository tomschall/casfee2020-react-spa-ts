import React from 'react';
import { Link } from 'react-router-dom';
import { useWatchChannelsSubscription } from '../../api/generated/graphql';
import { Channel_Type_Enum } from '../../api/generated/graphql';
import { useRecoilState } from 'recoil';
import { currentChannelState } from '../../atom';
import {
  Badge,
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
import ChannelListMessageCounter from './ChannelListMessageCounter';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  treeView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  badge: {
    backgroundColor: '#0f0',
  },
}));

const Channels: React.FC<any> = () => {
  const classes = useStyles();
  const [currentChannel] = useRecoilState<any>(currentChannelState);

  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const { data, loading, error } = useWatchChannelsSubscription({
    variables: {
      channel_type: Channel_Type_Enum.ChatMessage,
    },
  });

  if (error) {
    return <Alert severity="error">Channels could not be loaded.</Alert>;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <List className={classes.root}>
        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <PeopleOutlineIcon />
          </ListItemIcon>
          <ListItemText>
            <Typography variant="h6">Channels</Typography>
          </ListItemText>
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div">
            {data?.channels?.map((data: any) => (
              <ListItem key={data.id} button>
                {data?.name === currentChannel?.name ? (
                  <ListItemIcon>
                    <Badge classes={{ badge: classes.badge }} variant="dot">
                      {data.is_private === true ? (
                        <EnhancedEncryptionOutlinedIcon />
                      ) : (
                        <PeopleIcon color="secondary" />
                      )}
                    </Badge>
                  </ListItemIcon>
                ) : (
                  <ListItemIcon>
                    {data.is_private === true ? (
                      <EnhancedEncryptionOutlinedIcon />
                    ) : (
                      <PeopleIcon color="secondary" />
                    )}
                  </ListItemIcon>
                )}
                {data?.name === currentChannel?.name ? (
                  <ListItemText>
                    <Link
                      data-channel-name="data.name"
                      to={'/channel/' + data.name}
                    >
                      <Typography variant="h6" color="secondary">
                        {data.name}
                      </Typography>
                    </Link>
                  </ListItemText>
                ) : (
                  <React.Fragment>
                    <Link
                      to={'/channel/' + data.name}
                      data-channel-name={data.name}
                    >
                      <ListItemText primary={data?.name} />
                    </Link>
                    <ChannelListMessageCounter channelId={data.id} />
                  </React.Fragment>
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
