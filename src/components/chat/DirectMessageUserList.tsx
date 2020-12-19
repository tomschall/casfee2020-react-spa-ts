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
import { Link, useHistory } from 'react-router-dom';
import { useWatchDirectMessageChannelsSubscription } from '../../api/generated/graphql';
import { Channel_Type_Enum } from '../../api/generated/graphql';
import ChannelListMessageCounter from './ChannelListMessageCounter';
import { makeStyles } from '@material-ui/core/styles';
import OnlineUserStatus from '../shared/OnlineUserStatus';

const useStyles = makeStyles((theme) => ({
  root: {},
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
    color: '#f9cd8b',
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
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div">
            {data?.channels.map((data: any) => (
              <ListItem button key={data.id}>
                <ChannelListMessageCounter channelId={data.id} />
                <ListItemText
                  primary={
                    <React.Fragment>
                      <Link
                        className={classes.link}
                        to={'/channel/' + data.name}
                      >
                        {data.user_channels[0]?.user.username}
                      </Link>
                    </React.Fragment>
                  }
                />
                <OnlineUserStatus user={data.user_channels[0]?.user} />
              </ListItem>
            ))}
          </List>
        </Collapse>
      </List>
    </>
  );
};

export default DirectMessageUserList;
