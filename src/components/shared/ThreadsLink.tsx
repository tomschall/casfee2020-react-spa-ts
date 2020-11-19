import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {
  Badge,
  Box,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/People';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

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

const ThreadsLink: React.FC<any> = () => {
  const classes = useStyles();

  return (
    <>
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon color="secondary" />
        </ListItemIcon>
        <ListItemText>
          <Link to="/channel/threads">
            <Typography variant="h6">Threads</Typography>
          </Link>
        </ListItemText>
      </ListItem>
    </>
  );
};

export default ThreadsLink;
