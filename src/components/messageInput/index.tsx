import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { TextField, Button } from '@material-ui/core';
import { theme } from '../../theme/theme';
import Icon from '@material-ui/core/Icon';
import useStyles from './styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useInsertMessageMutation } from '../../api/generated/graphql';

interface ChatInputProps {
  channelId: number;
  handleSetLastMessage: Function;
  preLastMessageId: number;
}

const ChatInput: React.FC<ChatInputProps> = (props) => {
  const classes = useStyles();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  const setTextFieldSize = () => {
    switch (matches) {
      case true:
        return 'medium';
      case false:
        return 'small';

      default:
        return 'small';
    }
  };

  const setButtonSize = () => {
    switch (matches) {
      case true:
        return 'large';
      case false:
        return 'small';

      default:
        return 'small';
    }
  };

  const { user } = useAuth0();
  const [text, setText] = useState('');

  const channelId = props.channelId;

  const handleTyping = (text: string) => {
    setText(text);
  };

  const [
    sendMessage,
    { data: sendUpdateMessageData },
  ] = useInsertMessageMutation();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (text === '') {
      return;
    }

    props.handleSetLastMessage({
      id: props.preLastMessageId + 1,
      user: {
        username: user.nickname,
      },
      user_id: user.sub,
      text: text,
      channel_id: channelId,
    });

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
    <form
      noValidate
      autoComplete="off"
      className={classes.root}
      onSubmit={handleSubmit}
    >
      <TextField
        value={text}
        autoFocus={true}
        onChange={(e) => {
          handleTyping(e.target.value);
        }}
        size={setTextFieldSize()}
        variant="outlined"
        color="secondary"
        autoComplete="off"
        placeholder="Type your message here ..."
        id="standard-basic"
        label="Cackle your message here ..."
        // fullWidth
        InputProps={{
          classes: {
            input: classes.messageInput,
          },
        }}
        InputLabelProps={{
          className: classes.messageInput,
        }}
      />
      <Button
        size={setButtonSize()}
        type={'submit'}
        variant="contained"
        endIcon={<Icon>send</Icon>}
        className={classes.messageButton}
      >
        Send
      </Button>
    </form>
  );
};

export default ChatInput;