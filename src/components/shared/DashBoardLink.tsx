import React from 'react';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core';
import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined';
import { Link } from 'react-router-dom';

const DashboardLink: React.FC = () => {
  return (
    <>
      <ListItem button>
        <ListItemIcon>
          <ForumOutlinedIcon />
        </ListItemIcon>
        <ListItemText>
          <Link to="/dashboard" aria-label="Open Dashboard">
            <Typography variant="h6">Dashboard</Typography>
          </Link>
        </ListItemText>
      </ListItem>
    </>
  );
};

export default DashboardLink;
