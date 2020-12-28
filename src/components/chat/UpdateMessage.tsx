import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { TextField, Button, Icon } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useSetRecoilState } from 'recoil';
import { Message } from '../../interfaces/message.interface';
import { makeStyles } from '@material-ui/core/styles';
import { useUpdateMessageMutation } from '../../api/generated/graphql';
import Loader from '../shared/Loader';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  form: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  messageButton: {
    [theme.breakpoints.down('md')]: {
      width: '100%',
      size: 'small',
    },
    [theme.breakpoints.up('md')]: {
      size: 'large',
      width: '25%',
    },
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(0),
    backgroundColor: theme.palette.primary.dark,
  },
}));

interface UpdateMessageProps {
  message: Message;
}

const UpdateMessage: React.FC<UpdateMessageProps> = ({ message }) => {
  const classes = useStyles();
  const { user } = useAuth0();
  const [text, setText] = useState<string>('');

  useEffect(() => {
    setText(message.text);
  }, [message]);

  const [
    updateMessageMutation,
    { data, loading, error },
  ] = useUpdateMessageMutation();

  const handleUpdate = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (text === '') return;
    await updateMessageMutation({
      variables: {
        _eq: message.id,
        text,
      },
    });
  };

  const handleTyping = (text: string) => {
    setText(text);
  };

  if (loading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  if (
    error ||
    (data?.update_message?.affected_rows !== undefined &&
      data?.update_message?.affected_rows === 0)
  ) {
    return <Alert severity="error">Message could not get deleted...</Alert>;
  }

  return (
    <div className={classes.root}>
      <form noValidate autoComplete="off" className={classes.form}>
        <TextField
          value={text}
          autoFocus={true}
          onChange={(e) => {
            handleTyping(e.target.value);
          }}
          variant="outlined"
          color="secondary"
          autoComplete="off"
          multiline
          rowsMax={4}
          id="update-chat-message-input"
          label={'Update message...'}
        />

        <Button
          id="update-chat-message-button"
          variant="contained"
          endIcon={<Icon>send</Icon>}
          className={classes.messageButton}
          onClick={(e) => handleUpdate(e)}
          type="button"
          aria-label="update message"
        >
          Save
        </Button>
      </form>
    </div>
  );
};

export default UpdateMessage;
