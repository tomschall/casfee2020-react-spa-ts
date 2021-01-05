import React from 'react';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core';
import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined';
import { Link } from 'react-router-dom';

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
