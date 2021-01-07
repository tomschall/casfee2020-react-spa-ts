import React, { useEffect } from 'react';
import { useDeletePollQuestionMutation } from '../../api/generated/graphql';
import { Button } from '@material-ui/core';

interface DeleteAnswerProps {
  questionId: number;
  setActiveState: boolean;
  channelPollState?: Array<any>;
}

const DeleteQuestion: React.FC<DeleteAnswerProps> = ({
  questionId,
  setActiveState,
  channelPollState,
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
    console.log(`Error on delete question ${questionId}`);
  }

  return (
    <>
      {setActiveState === true ? (
        <Button variant="outlined" size="small" color="secondary" disabled>
          Poll locked
        </Button>
      ) : (
        <Button
          variant="contained"
          size="small"
          color="secondary"
          onClick={() => {
            handleQuestionDelete(questionId);
          }}
          aria-label="Delete Question"
        >
          Delete
        </Button>
      )}
    </>
  );
};

export default DeleteQuestion;
