import React, { useEffect } from 'react';
import { Chip } from '@material-ui/core';

interface GetPollAnswerIdProps {
  pollQuestionId: number;
}

const GetPollAnswerId: React.FC<GetPollAnswerIdProps> = ({
  pollQuestionId,
}) => {
  useEffect(() => {}, [pollQuestionId]);

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
