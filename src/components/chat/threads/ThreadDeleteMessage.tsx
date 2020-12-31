import React from 'react';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { IconButton } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useDeleteThreadMessageMutation } from '../../../api/generated/graphql';

interface ThreadDeleteMessageProps {
  messageId: number;
}

const ThreadDeleteMessage: React.FC<ThreadDeleteMessageProps> = ({
  messageId,
}) => {
  const [
    deleteThreadMessageMutation,
    { data, error },
  ] = useDeleteThreadMessageMutation();

  const handleDelete = (messageId: number) => {
    deleteThreadMessageMutation({
      variables: {
        message_id: messageId,
      },
    });
  };

  if (
    error ||
    (data?.delete_channel_thread_message?.affected_rows !== undefined &&
      data?.delete_channel_thread_message?.affected_rows === 0)
  ) {
    return <Alert severity="error">Message could not get deleted...</Alert>;
  }

  return (
    <IconButton
      onClick={() => handleDelete(messageId)}
      aria-label={`delete message ${messageId}`}
    >
      <HighlightOffIcon color="primary" fontSize="small" />
    </IconButton>
  );
};

export default ThreadDeleteMessage;
