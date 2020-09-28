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
import Loader from '../../layout/shared/Loader';
import PeopleIcon from '@material-ui/icons/People';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import EnhancedEncryptionOutlinedIcon from '@material-ui/icons/EnhancedEncryptionOutlined';
import useStyles from './styles';

const Channels: React.FC<any> = () => {
  const classes = useStyles();
  const [currentChannel, setCurrentChannel] = useRecoilState<any>(
    currentChannelState,
  );

  console.log('currentChannel', currentChannel);

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
            {data?.channels.map((data: any) => (
              <ListItem key={data.id} button>
                <ListItemIcon>
                  <Badge classes={{ badge: classes.badge }} variant="dot">
                    {data.is_private === true ? (
                      <EnhancedEncryptionOutlinedIcon />
                    ) : (
                      <PeopleIcon color="secondary" />
                    )}
                  </Badge>
                </ListItemIcon>
                <ListItemText>
                  <Link to={'/channel/' + data.name}>
                    <Typography variant="h6" color="secondary">
                      {data.name}
                    </Typography>
                  </Link>
                </ListItemText>
              </ListItem>
            ))}
          </List>
        </Collapse>
      </List>
    </>
  );
};

export default Channels;
