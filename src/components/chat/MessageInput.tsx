import React, { useState, useRef } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { TextField, Box, InputAdornment, IconButton } from '@material-ui/core';
import { theme } from '../../theme/theme';
import SendIcon from '@material-ui/icons/Send';
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
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  giphyImage: {
    marginTop: theme.spacing(0),
  },
  form: {
    display: 'flex',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    flexDirection: 'column',
    flexGrow: 1,
    [theme.breakpoints.down('md')]: {
      marginTop: theme.spacing(1),
    },
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(0),
    },
  },
  messageInput: {
    [theme.breakpoints.down('md')]: {
      fontSize: '1rem',
    },
    '&.MuiFormLabel-root.Mui-focused': {
      color: theme.palette.secondary.main,
    },
  },

  image: {
    border: '2px solid ' + theme.palette.secondary.main,
    height: 150,
    marginBottom: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      maxHeight: 250,
    },
    [theme.breakpoints.down('lg')]: {
      border: '2px solid ' + theme.palette.secondary.main,
      height: 150,
      maxWidth: '150vw',
      maxHeight: '70vw',
    },
    [theme.breakpoints.down('md')]: {
      border: '2px solid ' + theme.palette.secondary.main,
      height: 120,
      maxWidth: '100vw',
      maxHeight: '50vw',
    },
  },
}));

interface MessageInputProps {
  channelId: number;
  handleSetLastMessage: Function;
  preLastMessageId: number;
  scrollToBottom: any;
}

const MessageInput: React.FC<MessageInputProps> = (props) => {
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

  const { user } = useAuth0();

  const [text, setText] = useState<string>('');

  const [gif, setGif] = useRecoilState<IGif | null>(giphyState);

  const [deletedMessage, setdeletedMessage] = useRecoilState<boolean>(
    deletedMessageState,
  );

  let textInput = useRef<HTMLDivElement>(null);

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

  const [sendMessage] = useInsertMessageMutation();

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
      image: gif?.images?.fixed_width?.url,
      channel_id: channelId,
    });

    props.scrollToBottom(true);

    await sendMessage({
      variables: {
        message: {
          user_id: user.sub,
          text: text,
          image: gif?.images?.fixed_width?.url,
          channel_id: channelId,
        },
      },
    });

    setText('');
    setGif(null);
    setdeletedMessage(false);
    textInput?.current?.focus();
  };

  return (
    <Box className={classes.root}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        className={classes.giphyImage}
      >
        {gif && (
          <img
            className={classes.image}
            alt="Giphy"
            src={gif?.images?.fixed_width?.url}
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
        <TextField
          value={text}
          autoFocus={false}
          onChange={(e) => {
            handleTyping(e.target.value);
          }}
          focused={true}
          inputRef={textInput}
          size={setTextFieldSize()}
          variant="outlined"
          multiline
          rows={1}
          color="primary"
          autoComplete="off"
          id="chat-message-input"
          label={<TypingIndicator />}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  type="submit"
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
    </Box>
  );
};

export default MessageInput;
