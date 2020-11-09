import React from 'react';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { IconButton, CircularProgress } from '@material-ui/core';
import { useDeleteMessageMutation } from '../../api/generated/graphql';
import { Alert } from '@material-ui/lab';
import { deletedMessageState } from '../../atom';
import { useSetRecoilState } from 'recoil';

interface DeleteMessageProps {
  messageId: number;
}

const DeleteMessage: React.FC<DeleteMessageProps> = ({ messageId }) => {
  const setdeletedMessage = useSetRecoilState<boolean>(deletedMessageState);

  const [
    deleteMessageMutation,
    { data, loading, error },
  ] = useDeleteMessageMutation();

  const handleDelete = (messageId: number) => {
    deleteMessageMutation({
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
    (data?.delete_message?.affected_rows !== undefined &&
      data?.delete_message?.affected_rows === 0)
  ) {
    return <Alert severity="error">Message could not get deleted...</Alert>;
  }

  if (
    data?.delete_message?.affected_rows !== undefined &&
    data?.delete_message?.affected_rows >= 0
  ) {
    setdeletedMessage(true);
    return <Alert severity="success">Message has been deleted</Alert>;
  }

  return (
    <IconButton onClick={() => handleDelete(messageId)}>
      <HighlightOffIcon fontSize="small" />
    </IconButton>
  );
};

export default DeleteMessage;
