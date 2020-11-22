import React from 'react';
import { Divider, Grid } from '@material-ui/core';

import GetPollQuestions from './GetPollQuestions';
import AddPollQuestion from './AddPollQuestion';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  divider: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
}));

const PollingDashBoard: React.FC = () => {
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
