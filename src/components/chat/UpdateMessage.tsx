import React, { useState, useEffect } from 'react';
import { TextField, InputAdornment, IconButton } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Message } from '../../interfaces/message.interface';
import { makeStyles } from '@material-ui/core/styles';
import { useUpdateMessageMutation } from '../../api/generated/graphql';
import SendIcon from '@material-ui/icons/Send';
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
  messageInput: {
    [theme.breakpoints.down('md')]: {
      fontSize: '1rem',
    },
    '&.MuiFormLabel-root.Mui-focused': {
      color: theme.palette.secondary.main,
    },
  },
}));

interface UpdateMessageProps {
  message: Message;
}

const UpdateMessage: React.FC<UpdateMessageProps> = ({ message }) => {
  const classes = useStyles();
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
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleUpdate(e);
            }
          }}
          variant="outlined"
          color="secondary"
          autoComplete="off"
          multiline
          rowsMax={4}
          id="update-chat-message-input"
          label={'Update message...'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  id="message_submit"
                  onClick={(e) => handleUpdate(e)}
                  color="secondary"
                  aria-label="Send message"
                >
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            ),
            classes: {
              input: classes.messageInput,
            },
          }}
          InputLabelProps={{
            className: classes.messageInput,
          }}
        />
      </form>
    </div>
  );
};

export default UpdateMessage;
