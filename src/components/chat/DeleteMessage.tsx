import React from 'react';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { IconButton } from '@material-ui/core';
import { useDeleteMessageMutation } from '../../api/generated/graphql';
import { deletedMessageState } from '../../atom';
import { useSetRecoilState } from 'recoil';
import { logToConsole } from '../../helpers/helpers';

interface DeleteMessageProps {
  messageId: number;
}

const DeleteMessage: React.FC<DeleteMessageProps> = ({ messageId }) => {
  const setdeletedMessage = useSetRecoilState<boolean>(deletedMessageState);
  const [deleteMessageMutation, { data, error }] = useDeleteMessageMutation();

  const handleDelete = async (e: React.SyntheticEvent, messageId: number) => {
    e.stopPropagation();
    setdeletedMessage(true);
    await deleteMessageMutation({
      variables: {
        message_id: messageId,
      },
    });
  };

  if (
    error ||
    (data?.delete_message?.affected_rows !== undefined &&
      data?.delete_message?.affected_rows === 0)
  ) {
    logToConsole('Message could not get deleted...', error);
  }

  return (
    <IconButton
      onClick={(e) => handleDelete(e, messageId)}
      aria-label={`Delete message id ${messageId}`}
    >
      <HighlightOffIcon color="primary" fontSize="small" />
    </IconButton>
  );
};

export default DeleteMessage;
