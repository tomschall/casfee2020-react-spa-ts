import React from 'react';
import {
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
import Loader from '../shared/Loader';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { useWatchDirectMessageChannelsSubscription } from '../../api/generated/graphql';
import { Channel_Type_Enum } from '../../api/generated/graphql';
import UnreadMessageCounter from './UnreadMessageCounter';
import { makeStyles } from '@material-ui/core/styles';
import OnlineUserStatus from '../shared/OnlineUserStatus';
import { useRecoilState } from 'recoil';
import { currentChannelState } from '../../atom';

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(0),
  },
  form: {
    flexGrow: 1,
    margin: theme.spacing(2),
  },
  submit: {
    marginTop: theme.spacing(2),
  },
  itemText: {
    color: theme.palette.primary.light,
    fontWeight: 700,
  },
  link: {
    color: '#0288D1',
    fontSize: '0.875rem',
  },
}));

interface DirectMessageUserListProps {
  user_id: string;
}

const DirectMessageUserList: React.FC<DirectMessageUserListProps> = ({
  user_id,
}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  let history = useHistory();
  const [currentChannel] = useRecoilState<any>(currentChannelState);
  const match = useRouteMatch(`/channel/${currentChannel?.name}`);

  const { data, loading, error } = useWatchDirectMessageChannelsSubscription({
    variables: {
      channel_type: Channel_Type_Enum.DirectMessage,
      user_id,
    },
  });

  if (error) {
    console.log('error', error);
    return (
      <Alert severity="error">A DirectMessageUserListError occured.</Alert>
    );
  }

  if (loading) {
    return <Loader />;
  }

  const activeLink = () => {
    return match ? 'secondary' : 'primary';
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const navigateToAddDirectMessageChannelMembers = () => {
    history.push(`/addDirectMessageChannelMembers`);
  };

  return (
    <>
      <List component="div">
        <ListItem button onClick={handleClick}>
          <ListItemIcon aria-label="open direct message list">
            <PersonIcon />
          </ListItemIcon>
          <ListItemText>
            <Typography variant="h6">Direct Messages</Typography>
          </ListItemText>
          <ListItemIcon>
            <AddCircleOutlineIcon
              color="secondary"
              onClick={navigateToAddDirectMessageChannelMembers}
            />
          </ListItemIcon>
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto">
          <List component="div">
            {data?.channels.map((data: any) => (
              <ListItem
                button
                component={Link}
                key={data.name}
                className={classes.link}
                to={'/channel/' + data.name}
                aria-label={data.user_channels[0]?.user.username}
              >
                <OnlineUserStatus user={data.user_channels[0]?.user} />
                {data?.id === currentChannel?.id ? (
                  <>
                    <ListItemText>
                      <Typography variant="h6" color={activeLink()}>
                        {data.user_channels[0]?.user.username}
                      </Typography>
                    </ListItemText>
                  </>
                ) : (
                  <>
                    <ListItemText>
                      <Typography variant="h6">
                        {data.user_channels[0]?.user.username}
                      </Typography>
                    </ListItemText>
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

export default DirectMessageUserList;
