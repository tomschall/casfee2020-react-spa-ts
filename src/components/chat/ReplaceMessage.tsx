import React from 'react';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { IconButton } from '@material-ui/core';
import { useUpdateMessageMutation } from '../../api/generated/graphql';
import { logToConsole } from '../../helpers/helpers';

interface ReplaceMessageProps {
  messageId: number;
}

const ReplaceMessage: React.FC<ReplaceMessageProps> = ({ messageId }) => {
  const [updateMessageMutation, { data, error }] = useUpdateMessageMutation();

  const handleReplace = async (e: React.SyntheticEvent) => {
    e.stopPropagation();

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
    logToConsole('Message could not get updated...', error);
  }

  return (
    <IconButton onClick={handleReplace} aria-label="Replace message">
      <HighlightOffIcon color="primary" fontSize="small" />
    </IconButton>
  );
};

export default ReplaceMessage;
