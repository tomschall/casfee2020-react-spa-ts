import React from 'react';
import { Link as Linky } from 'react-router-dom';
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
import UserStatus from '../shared/UserStatus';
import Logout from '../Logout';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing(5),
      marginLeft: theme.spacing(5),
      marginTop: theme.spacing(0),
      marginBottom: theme.spacing(5),
    },
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(2),
      margin: theme.spacing(0),
      paddingTop: theme.spacing(2),
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0),
      margin: theme.spacing(0),
      paddingTop: theme.spacing(2),
    },
  },
  treeView: {
    overflowY: 'hidden',
    maxHeight: '50vh',
    marginRight: theme.spacing(0),
    marginLeft: theme.spacing(0),
    paddingRight: theme.spacing(0),
  },
  branding: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

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
                  <Linky to={'/dashboard/users'}>
                    <Typography variant="h6" color="secondary">
                      Users
                    </Typography>
                  </Linky>
                </ListItemText>
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <HowToVoteIcon />
                </ListItemIcon>
                <ListItemText>
                  <Linky to={'/dashboard/pollings'}>
                    <Typography variant="h6" color="secondary">
                      Pollings
                    </Typography>
                  </Linky>
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
