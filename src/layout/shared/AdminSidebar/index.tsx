import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import {
  Box,
  Divider,
  Grid,
  List,
  ListSubheader,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import UserStatus from '../../../components/userStatus';
import Channels from '../../../components/channelList';
import Logout from '../../../components/logout';

import useStyles from './styles';

const AdminSidebar: React.FC<any> = () => {
  const classes = useStyles();
  const { user } = useAuth0();

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        flex="1"
        className={classes.root}
      >
        <Grid container>
          <Grid item xs={12}>
            <UserStatus user_id={user.sub} />
          </Grid>
          <Grid item xs={12} className={classes.branding}>
            <img
              alt="The Great Chicken Fest"
              src="/the-great-chicken-fest.svg"
              width="300"
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.treeView}>
            <Divider />
            <List
              component="nav"
              aria-labelledby="nested-list-subheader"
              subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                  Administration
                </ListSubheader>
              }
              className={classes.root}
            >
              <ListItem button>
                <ListItemIcon>
                  <PeopleOutlineIcon />
                </ListItemIcon>
                <ListItemText>
                  <Link to={'/dashboard/users'}>
                    <Typography variant="h6" color="secondary">
                      Users
                    </Typography>
                  </Link>
                </ListItemText>
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <HowToVoteIcon />
                </ListItemIcon>
                <ListItemText>
                  <Link to={'/dashboard/pollings'}>
                    <Typography variant="h6" color="secondary">
                      Pollings
                    </Typography>
                  </Link>
                </ListItemText>
              </ListItem>
            </List>
            <Divider />
            <Logout />
          </Box>
        </Grid>
      </Box>
    </>
  );
};

export default AdminSidebar;
