import React from 'react';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { IconButton, CircularProgress } from '@material-ui/core';
import { useDeleteThreadMessageMutation } from '../../../api/generated/graphql';
import { Alert } from '@material-ui/lab';

interface ThreadDeleteMessageProps {
  messageId: number;
}

const ThreadDeleteMessage: React.FC<ThreadDeleteMessageProps> = ({
  messageId,
}) => {
  const [
    deleteThreadMessageMutation,
    { data, loading, error },
  ] = useDeleteThreadMessageMutation();

  const handleDelete = (messageId: number) => {
    deleteThreadMessageMutation({
      variables: {
        message_id: messageId,
      },
    });
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (
    error ||
    (data?.delete_channel_thread_message?.affected_rows !== undefined &&
      data?.delete_channel_thread_message?.affected_rows === 0)
  ) {
    return <Alert severity="error">Message could not get deleted...</Alert>;
  }

  return (
    <IconButton onClick={() => handleDelete(messageId)}>
      <HighlightOffIcon fontSize="small" />
    </IconButton>
  );
};

export default ThreadDeleteMessage;
