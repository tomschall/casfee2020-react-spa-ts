import React, { useEffect } from 'react';
import { useDeletePollQuestionMutation } from '../../api/generated/graphql';
import { Button } from '@material-ui/core';
import { theme } from '../../theme/theme';

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
  const [tobeDeleted, setToBeDeleted] = React.useState(setActiveState);
  const [deleteQuestion, { error }] = useDeletePollQuestionMutation({
    variables: {
      pollQuestionId: questionId,
    },
  });

  console.log(questionId, tobeDeleted, channelPollState);

  useEffect(() => {
    console.log('setActiveState', tobeDeleted);
  }, [tobeDeleted]);

  const handleQuestionDelete = async (questionId: number) => {
    if (!questionId) return;

    console.log('question delete', questionId);

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
      {tobeDeleted ? (
        <Button variant="outlined" size="small" color="secondary" disabled>
          Active poll
        </Button>
      ) : (
        <Button
          variant="outlined"
          size="small"
          color="primary"
          onClick={() => {
            handleQuestionDelete(questionId);
          }}
        >
          Delete
        </Button>
      )}
    </>
  );
};

export default DeleteQuestion;
