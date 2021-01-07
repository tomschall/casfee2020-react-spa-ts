import React from 'react';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import { Link, useRouteMatch } from 'react-router-dom';

const DashboardLink: React.FC = () => {
  const match = useRouteMatch('/dashboard');

  const activeLink = () => {
    return match ? 'secondary' : 'primary';
  };

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
          <Typography variant="h6" color={activeLink()}>
            Polling
          </Typography>
        </ListItemText>
      </ListItem>
    </>
  );
};

export default DashboardLink;
