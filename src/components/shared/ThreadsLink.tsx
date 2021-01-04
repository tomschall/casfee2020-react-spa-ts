import React from 'react';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core';
import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined';
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
  return (
    <>
      <ListItem
        button
        component={Link}
        to="/channel/threads"
        aria-label="Open Threads"
      >
        <ListItemIcon>
          <ForumOutlinedIcon />
        </ListItemIcon>
        <ListItemText>
          <Typography variant="h6" color="primary">
            Threads
          </Typography>
        </ListItemText>
      </ListItem>
    </>
  );
};

export default ThreadsLink;
