import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useInsertMessageMutation } from '../api/generated/graphql';
import '../App.css';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  messageInput: {
    flexGrow: 1,
    color: 'white',
    floatingLabelFocusStyle: {
      color: theme.palette.secondary,
    },
  },
  messageButton: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(3),
  },
}));

interface ChatInputProps {
  channelId: number;
}

const ChatInput: React.FC<ChatInputProps> = (props) => {
  const classes = useStyles();
  const { user } = useAuth0();
  const [text, setText] = useState('');

  const channelId = props.channelId;

  const handleTyping = (text: string) => {
    setText(text);
  };

  const [sendMessage, { data: sendUpdateMessageData }] = useInsertMessageMutation();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (text === '') {
      return;
    }

    await sendMessage({
      variables: {
        message: {
          user_id: user.sub,
          text: text,
          channel_id: channelId,
        },
      },
    });

    setText('');
  };

  return (
    <>
      <form
        className={classes.root}
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
      >
        <Grid container>
          <Grid xs={10} className={classes.messageInput}>
            <TextField
              value={text}
              autoFocus={true}
              onChange={(e) => {
                handleTyping(e.target.value);
              }}
              autoComplete="off"
              placeholder="Chicken Fest"
              id="standard-basic"
              label="Cackle your message here ..."
              fullWidth
              InputProps={{
                classes: {
                  input: classes.messageInput,
                },
              }}
              InputLabelProps={{
                className: classes.messageInput,
              }}
            />
          </Grid>
          <Grid xs={2}>
            <Button
              className={classes.messageButton}
              variant="contained"
              size="large"
              color="secondary"
              type={'submit'}
            >
              Send
            </Button>
          </Grid>
        </Grid>
      </form>
      {user?.nickname}
      <br/>
      {user?.sub}
    </>
  );
};

export default ChatInput;
