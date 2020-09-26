import React from 'react';
import {
  Avatar,
  Badge,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import useStyles from './styles';

const Users: React.FC = () => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <List className={classes.root}>
        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <Badge classes={{ badge: classes.badge }} variant="dot">
              <PersonIcon />
            </Badge>
          </ListItemIcon>
          <ListItemText>
            <Typography variant="h6">Users</Typography>
          </ListItemText>
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div">
            <ListItem button>
              <ListItemText primary="Thomas" />
              <ListItemIcon>
                <Badge
                  classes={{ badge: classes.badge }}
                  variant="dot"
                  invisible
                >
                  <Avatar alt="Username" src="/chicken-chat-logo.svg" />
                </Badge>
              </ListItemIcon>
            </ListItem>
            <ListItem button>
              <ListItemText primary="Roli" />
              <ListItemIcon>
                <Badge classes={{ badge: classes.badge }} variant="dot">
                  <Avatar alt="Username" src="/chicken-chat-logo.svg" />
                </Badge>
              </ListItemIcon>
            </ListItem>
          </List>
        </Collapse>
      </List>
    </>
  );
};

export default Users;
