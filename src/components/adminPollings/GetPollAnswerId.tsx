import React, { useEffect } from 'react';
import { Chip } from '@material-ui/core';

interface GetPollAnswerIdProps {
  pollQuestionId: number;
}

const GetPollAnswerId: React.FC<GetPollAnswerIdProps> = ({
  pollQuestionId,
}) => {
  useEffect(() => {
    console.log('GetPollAnswerId did mount');
  }, [pollQuestionId]);

  return (
    <>
      <Chip
        color="secondary"
        size="small"
        variant="outlined"
        label={'Poll question id: ' + pollQuestionId}
      />
    </>
  );
};

export default GetPollAnswerId;
