import React from 'react';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { IconButton, CircularProgress } from '@material-ui/core';
import { useUpdateMessageMutation } from '../../api/generated/graphql';
import { Alert } from '@material-ui/lab';

interface ReplaceMessageProps {
  messageId: number;
}

const ReplaceMessage: React.FC<ReplaceMessageProps> = ({ messageId }) => {
  const [updateMessageMutation, { data, error }] = useUpdateMessageMutation();

  const handleReplace = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await updateMessageMutation({
      variables: {
        _eq: messageId,
        text: '...this message was deleted.',
        deleted: true,
      },
    });
  };

  if (
    error ||
    (data?.update_message?.affected_rows !== undefined &&
      data?.update_message?.affected_rows === 0)
  ) {
    return <Alert severity="error">Message could not get updated...</Alert>;
  }

  return (
    <IconButton onClick={handleReplace}>
      <HighlightOffIcon fontSize="small" />
    </IconButton>
  );
};

export default ReplaceMessage;
