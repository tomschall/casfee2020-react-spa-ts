import React from 'react';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import { Link } from 'react-router-dom';

const DashboardLink: React.FC = () => {
  return (
    <>
      <ListItem
        button
        component={Link}
        to="/dashboard"
        aria-label="Open Dashboard"
      >
        <ListItemIcon>
          <HowToVoteIcon />
        </ListItemIcon>
        <ListItemText>
          <Typography variant="h6">Polling</Typography>
        </ListItemText>
      </ListItem>
    </>
  );
};

export default DashboardLink;
