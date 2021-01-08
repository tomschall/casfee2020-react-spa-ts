import React from 'react';
import { Divider } from '@material-ui/core';

import GetPollQuestions from './GetPollQuestions';
import AddPollQuestion from './AddPollQuestion';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  divider: {
    marginTop: theme.spacing(2),
  },
}));

const PollingDashBoard: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <AddPollQuestion />
      <Divider className={classes.divider} />
      <GetPollQuestions />
    </>
  );
};

export default PollingDashBoard;
