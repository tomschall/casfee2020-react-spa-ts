import React, { useEffect } from 'react';
import { useDeletePollAnswerIdMutation } from '../../api/generated/graphql';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';

interface DeleteAnswerProps {
  answerId: number;
  setActiveState: boolean;
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

  useEffect(() => {}, [answerId, setActiveState]);

  const handleDeleteAnswer = async (answerId: number) => {
    await deletePollAnswerIdMutation({
      variables: {
        pollAnswerId: answerId,
      },
    });
  };

  return (
    <>
      <IconButton
        id="answer_update"
        type="submit"
        color="secondary"
        aria-label="Update answer text"
        disabled={setActiveState}
        onClick={() => {
          handleDeleteAnswer(answerId);
        }}
      >
        <DeleteIcon />
      </IconButton>
    </>
  );
};

export default DeleteAnswer;
