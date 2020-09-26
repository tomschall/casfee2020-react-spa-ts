import React from 'react';
import {
  Badge,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/People';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import EnhancedEncryptionOutlinedIcon from '@material-ui/icons/EnhancedEncryptionOutlined';

import useStyles from './styles';

const Channels: React.FC = () => {
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
            <PeopleOutlineIcon />
          </ListItemIcon>
          <ListItemText>
            <Typography variant="h6">Channels</Typography>
          </ListItemText>
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div">
            <ListItem button>
              <ListItemIcon>
                <Badge classes={{ badge: classes.badge }} variant="dot">
                  <PeopleIcon color="secondary" />
                </Badge>
              </ListItemIcon>
              <ListItemText>
                <Typography variant="h6" color="secondary">
                  General
                </Typography>
              </ListItemText>
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <Badge classes={{ badge: classes.badge }} variant="dot">
                  <EnhancedEncryptionOutlinedIcon />
                </Badge>
              </ListItemIcon>

              <ListItemText primary="Private Channel" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <PeopleOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="Channel III" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <PeopleOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="Channel IV" />
            </ListItem>
          </List>
        </Collapse>
      </List>
    </>
  );
};

export default Channels;
