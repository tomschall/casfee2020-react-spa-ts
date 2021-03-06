import React from 'react';
import { useDeletePollQuestionMutation } from '../../api/generated/graphql';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { logToConsole } from '../../helpers/helpers';

interface DeleteAnswerProps {
  questionId: number;
  setActiveState: boolean;
}

const DeleteQuestion: React.FC<DeleteAnswerProps> = ({
  questionId,
  setActiveState,
}) => {
  const [deleteQuestion, { error }] = useDeletePollQuestionMutation({
    variables: {
      pollQuestionId: questionId,
    },
  });

  const handleQuestionDelete = async (questionId: number) => {
    if (!questionId) return;

    await deleteQuestion({
      variables: {
        pollQuestionId: questionId,
      },
    });
  };

  if (error) {
    logToConsole('Error on delete question', error);
  }

  return (
    <>
      {setActiveState === true ? (
        <Button
          size="small"
          color="secondary"
          disabled
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      ) : (
        <Button
          size="small"
          color="secondary"
          onClick={() => {
            handleQuestionDelete(questionId);
          }}
          aria-label="Delete Question"
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      )}
    </>
  );
};

export default DeleteQuestion;
