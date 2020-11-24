import React, { useEffect } from 'react';
import { Button } from '@material-ui/core';
import {
  useWatchGetPollAnswersSubscription,
  useSetPublishPollQuestionStateMutation,
} from '../../api/generated/graphql';
import Loader from '../shared/Loader';
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
  const [readyToPublish, setReadyToPublish] = React.useState<boolean>(
    setActiveState,
  );
  const [setPollQuestionState] = useSetPublishPollQuestionStateMutation({
    variables: {
      pollQuestionId: pollQuestionId,
      is_active: setActiveState,
    },
  });
  const { data, loading } = useWatchGetPollAnswersSubscription({
    variables: {
      pollQuestionId: pollQuestionId,
    },
  });

  useEffect(() => {
    const totalAnswers = data?.poll_answers?.length;
    if (totalAnswers && totalAnswers > 1) {
      setReadyToPublish(false);
    } else {
      setReadyToPublish(true);
    }
  }, [readyToPublish, data]);

  const handleSetPollQuestionPublishState = async () => {
    await setPollQuestionState({
      variables: {
        pollQuestionId: pollQuestionId,
        is_active: !setActiveState,
      },
    });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Button
        variant={readyToPublish ? 'outlined' : 'contained'}
        color="secondary"
        disabled={readyToPublish}
        endIcon={
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
