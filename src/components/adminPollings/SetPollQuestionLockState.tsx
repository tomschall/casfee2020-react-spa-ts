import React, { useEffect } from 'react';
import { Button } from '@material-ui/core';
import { useSetPublishPollQuestionStateMutation } from '../../api/generated/graphql';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  lock: {
    color: theme.palette.error.main,
  },
  unlock: {
    color: theme.palette.success.main,
  },
}));

interface SetPollQuestionLockStateProps {
  pollQuestionId: number;
  setActiveState: boolean;
}

const SetPollQuestionLockState: React.FC<SetPollQuestionLockStateProps> = ({
  pollQuestionId,
  setActiveState,
}) => {
  const classes = useStyles();
  const [setPollQuestionState] = useSetPublishPollQuestionStateMutation({
    variables: {
      pollQuestionId: pollQuestionId,
      is_active: setActiveState,
    },
  });

  console.log('ACTIVE STATE', setActiveState);

  useEffect(() => {
    console.log(
      'SetPollQuestionLockState did mount',
      pollQuestionId,
      setActiveState,
    );
  }, [pollQuestionId, setActiveState]);

  const handleSetPollQuestionPublishState = async () => {
    await setPollQuestionState({
      variables: {
        pollQuestionId: pollQuestionId,
        is_active: !setActiveState,
      },
    });
  };

  return (
    <>
      <Button
        variant="outlined"
        color="secondary"
        startIcon={
          setActiveState ? (
            <LockIcon className={classes.lock} />
          ) : (
            <LockOpenIcon className={classes.unlock} />
          )
        }
        onClick={handleSetPollQuestionPublishState}
      >
        {setActiveState ? 'locked' : 'unlocked'}
      </Button>
    </>
  );
};

export default SetPollQuestionLockState;
