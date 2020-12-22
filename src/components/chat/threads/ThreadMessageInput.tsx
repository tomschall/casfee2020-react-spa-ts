import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { TextField, Button, Box } from '@material-ui/core';
import { theme } from '../../../theme/theme';
import Icon from '@material-ui/core/Icon';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {
  useInsertChannelThreadMessageMutation,
  useSendTypingEventMutation,
} from '../../../api/generated/graphql';
import { useRecoilState } from 'recoil';
import { giphyState, deletedMessageState } from '../../../atom';
import { IGif } from '@giphy/js-types';
import { makeStyles } from '@material-ui/core/styles';
import GiphyCarousel from '../../shared/GiphyCarousel';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  giphyVisible: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'flex-start',
  },
  giphyHidden: {
    display: 'none',
    marginTop: theme.spacing(0),
  },
  giphyImage: {
    marginTop: theme.spacing(0),
  },
  form: {
    display: 'flex',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(8),
    flexDirection: 'column',
    flexGrow: 1,
    [theme.breakpoints.down('md')]: {
      marginTop: theme.spacing(0.2),
    },
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(0),
    },
  },
  messageInput: {
    [theme.breakpoints.down('md')]: {
      fontSize: '.9rem',
    },
  },
  messageButton: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
    [theme.breakpoints.up('md')]: {
      size: 'large',
      width: '25%',
    },
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(0),
    backgroundColor: theme.palette.primary.dark,
  },
  image: {
    [theme.breakpoints.up('md')]: {
      maxHeight: 55,
    },
    [theme.breakpoints.down('md')]: {
      maxHeight: 40,
    },
    paddingRight: theme.spacing(1),
  },
}));

interface ThreadMessageInputProps {
  channelId: number;
  channelThreadId: number | undefined;
}

const ThreadMessageInput: React.FC<ThreadMessageInputProps> = (props) => {
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

  const [showGiphyCarousel, setShowGiphyCarousel] = React.useState(false);

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
  ] = useInsertChannelThreadMessageMutation();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (text === '' && gif === null) {
      return;
    }

    if (text.length > 2000) {
      alert('Your text limit has reached the limit of 2000 characters');
      return;
    }

    if (props.channelThreadId === undefined) {
      return;
    }

    await sendMessage({
      variables: {
        channel_thread_id: props.channelThreadId,
        message: text,
        image: gif?.images?.fixed_width?.url,
        user_id: user.sub,
      },
    });

    setText('');
    setGif(null);
    setdeletedMessage(false);
  };

  const hideGiphyCarousel = () => {
    setShowGiphyCarousel(false);
  };

  return (
    <div className={classes.root}>
      <Box className={gif ? classes.giphyImage : ''}>
        {gif && (
          <img
            className={classes.image}
            src={gif?.images?.fixed_width?.url}
            onClick={() => setGif(null)}
          />
        )}
      </Box>
      <Box>
        <Box
          className={
            showGiphyCarousel ? classes.giphyVisible : classes.giphyHidden
          }
          order={1}
        >
          <GiphyCarousel hideGiphyCarousel={() => hideGiphyCarousel()} />
        </Box>
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
          size={setTextFieldSize()}
          variant="outlined"
          color="secondary"
          autoComplete="off"
          placeholder="Type your message here ..."
          id={`chat-message-input-${props.channelThreadId}`}
          label={'Crackle your message here ...'}
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
          id={`chat-message-button-${props.channelThreadId}`}
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

export default ThreadMessageInput;
