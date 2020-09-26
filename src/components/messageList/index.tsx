import React from 'react';
import {
  Badge,
  Button,
  Chip,
  Grid,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
} from '@material-ui/core/';

import PeopleIcon from '@material-ui/icons/People';
import useStyles from './styles';

const MessageList: React.FC = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={12}>
            <Chip
              color="secondary"
              variant="outlined"
              size="small"
              icon={<PeopleIcon />}
              label="General"
            />
          </Grid>
          <Grid item>
            <ListItem>
              <ListItemAvatar>
                <ListItemIcon>
                  <Badge variant="dot">
                    <Avatar alt="Username" src="/chicken-chat-logo.svg" />
                  </Badge>
                </ListItemIcon>
              </ListItemAvatar>
              <ListItemText primary="Username" />
            </ListItem>
            <Typography component="p" className={classes.text}>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua.
            </Typography>

            <Button size="small" variant="outlined" color="secondary">
              Reply
            </Button>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default MessageList;
