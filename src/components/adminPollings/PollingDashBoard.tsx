import React from 'react';
import { Divider, Grid } from '@material-ui/core';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import { useAuth0 } from '@auth0/auth0-react';

import GetPollQuestions from './GetPollQuestions';
import AddPollQuestion from './AddPollQuestion';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {},
  divider: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  form: {},
  messageInput: {
    floatingLabelFocusStyle: {
      color: theme.palette.secondary.dark,
    },
  },
  messageButton: {
    [theme.breakpoints.down('md')]: {
      width: '100%',
      size: 'small',
    },
    [theme.breakpoints.up('md')]: {
      size: 'large',
      width: '25%',
    },
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(0),
    backgroundColor: theme.palette.primary.dark,
  },
}));

interface AdminPollingsProps {
  text?: string;
  owner_id: string;
  title: string;
}

const PollingDashBoard: React.FC<AdminPollingsProps> = () => {
  const classes = useStyles();

  return (
    <>
      <Grid item xs={12}>
        <AddPollQuestion />
        <Divider className={classes.divider} />
      </Grid>
      <Grid item xs={12}>
        <GetPollQuestions />
      </Grid>
    </>
  );
};

export default PollingDashBoard;
