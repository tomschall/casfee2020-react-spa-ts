import React, { useEffect } from 'react';
import { Chip, ListItemIcon } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {},
  play: {
    color: theme.palette.error.main,
  },
  stop: {
    color: theme.palette.success.main,
  },
}));

interface ShowPollQuestionLockStateProps {
  setActiveState: boolean;
}

const ShowPollQuestionLockState: React.FC<ShowPollQuestionLockStateProps> = ({
  setActiveState,
}) => {
  const classes = useStyles();

  useEffect(() => {}, []);

  return (
    <>
      <Chip
        size="small"
        variant="outlined"
        color="primary"
        icon={
          setActiveState ? (
            <LockIcon className={classes.play} />
          ) : (
            <LockOpenIcon className={classes.stop} />
          )
        }
        label={setActiveState ? 'locked' : 'unlocked'}
      />
    </>
  );
};

export default ShowPollQuestionLockState;
