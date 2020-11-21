import React, { useEffect } from 'react';
import { useDeletePollAnswerIdMutation } from '../../api/generated/graphql';
import { Button } from '@material-ui/core';

interface DeleteAnswerProps {
  answerId: number;
  setActiveState: boolean;
  // onClick: () => void;
}

const DeleteAnswer: React.FC<DeleteAnswerProps> = ({
  answerId,
  setActiveState,
}) => {
  const [deletePollAnswerIdMutation] = useDeletePollAnswerIdMutation({
    variables: {
      pollAnswerId: answerId,
    },
  });

  console.log('answerId', answerId, setActiveState);

  const handleDeleteAnswer = async (answerId: number) => {
    await deletePollAnswerIdMutation({
      variables: {
        pollAnswerId: answerId,
      },
    });
  };

  return (
    <>
      <Button
        style={{
          marginTop: '8px',
          marginLeft: '8px',
          maxWidth: '100px',
        }}
        variant="outlined"
        size="large"
        color="secondary"
        disabled={setActiveState}
        onClick={() => {
          handleDeleteAnswer(answerId);
        }}
      >
        Delete
      </Button>
    </>
  );
};

export default DeleteAnswer;
