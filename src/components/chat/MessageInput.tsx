import React, { useState, useRef } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { TextField, Button, Box } from '@material-ui/core';
import { theme } from '../../theme/theme';
import Icon from '@material-ui/core/Icon';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {
  useInsertMessageMutation,
  useSendTypingEventMutation,
} from '../../api/generated/graphql';
import TypingIndicator from '../shared/TypingIndicator';
import { useRecoilState } from 'recoil';
import { giphyState, deletedMessageState } from '../../atom';
import { IGif } from '@giphy/js-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  giphyImage: {
    marginTop: theme.spacing(2),
  },
  form: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  messageInput: {
    floatingLabelFocusStyle: {
      color: theme.palette.secondary.dark,
    },
  },
  messageButton: {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
    [theme.breakpoints.up('md')]: {
      size: 'large',
      width: '25%',
    },
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(0),
    backgroundColor: theme.palette.primary.dark,
  },
  image: {
    maxHeight: 55,
    paddingRight: theme.spacing(1),
  },
}));

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
  const [gif, setGif] = useRecoilState<IGif | null>(giphyState);
  const [deletedMessage, setdeletedMessage] = useRecoilState<boolean>(
    deletedMessageState,
  );

  const channelId = props.channelId;

  const [
    sendTypingEventMutation,
    { data, loading, error },
  ] = useSendTypingEventMutation({
    variables: {
      user_id: user.sub,
      channel_id: channelId,
    },
  });

  const handleTyping = (text: string) => {
    const textLength = text.length;
    if ((textLength !== 0 && textLength % 5 === 0) || textLength === 1) {
      sendTypingEventMutation();
    }
    setText(text);
  };

  const [
    sendMessage,
    { data: sendUpdateMessageData },
  ] = useInsertMessageMutation();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (text === '' && gif === null) {
      return;
    }

    if (text.length > 2000) {
      alert('Your text limit has reached the limit of 2000 characters');
      return;
    }

    props.handleSetLastMessage({
      id: props.preLastMessageId + 1,
      user: {
        username: user.nickname,
      },
      user_id: user.sub,
      text: text,
      image: gif?.images?.fixed_width_small?.url,
      channel_id: channelId,
    });

    await sendMessage({
      variables: {
        message: {
          user_id: user.sub,
          text: text,
          image: gif?.images?.fixed_width_small?.url,
          channel_id: channelId,
        },
      },
    });

    setText('');
    setGif(null);
    setdeletedMessage(false);
  };

  return (
    <div className={classes.root}>
      <Box className={classes.giphyImage}>
        {gif && (
          <img
            className={classes.image}
            src={gif?.images?.fixed_width_small?.url}
            onClick={() => setGif(null)}
          />
        )}
      </Box>
      <form
        noValidate
        autoComplete="off"
        className={classes.form}
        onSubmit={handleSubmit}
      >
        <TypingIndicator />
        <TextField
          value={text}
          autoFocus={false}
          onChange={(e) => {
            handleTyping(e.target.value);
          }}
          size={setTextFieldSize()}
          variant="outlined"
          color="secondary"
          autoComplete="off"
          placeholder="Type your message here ..."
          id="chat-message-input"
          label={'Crackle your message here ...'}
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
          id="chat-message-button"
          size={setButtonSize()}
          variant="contained"
          endIcon={<Icon>send</Icon>}
          className={classes.messageButton}
          type="submit"
        >
          Send
        </Button>
      </form>
    </div>
  );
};

export default ChatInput;
