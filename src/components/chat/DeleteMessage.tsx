import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, CircularProgress } from '@material-ui/core';
import { useDeleteMessageMutation } from '../../api/generated/graphql';
import { Alert } from '@material-ui/lab';
import { deletedMessageState } from '../../atom';
import { useRecoilState } from 'recoil';

const useStyles = makeStyles((theme) => ({
  root: {},
}));

interface DeleteMessageProps {
  messageId: number;
}

const DeleteMessage: React.FC<DeleteMessageProps> = ({ messageId }) => {
  const classes = useStyles();
  const { user } = useAuth0();
  const [deletedMessage, setdeletedMessage] = useRecoilState<boolean>(
    deletedMessageState,
  );

  const [
    deleteMessageMutation,
    { data, loading, error },
  ] = useDeleteMessageMutation();

  const handleDelete = (messageId: number) => {
    console.log('delete message', messageId);
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
    console.log('data', data);
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
