import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { TextField, Button, Box, Chip } from '@material-ui/core';
import { theme } from '../../../theme/theme';
import Icon from '@material-ui/core/Icon';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {
  useInsertChannelThreadMessageMutation,
  useSendTypingEventMutation,
} from '../../../api/generated/graphql';
import TypingIndicator from '../../shared/TypingIndicator';
import { useRecoilState } from 'recoil';
import { giphyState, deletedMessageState } from '../../../atom';
import { IGif } from '@giphy/js-types';
import { makeStyles } from '@material-ui/core/styles';
import GiphyCarousel from '../../shared/GiphyCarousel';
import AddGif from '@material-ui/icons/Gif';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rootSingleChip: {
    display: 'flex',
    flexDirection: 'column',
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
  image: {
    maxHeight: 55,
    paddingRight: theme.spacing(1),
  },
}));

interface ThreadMessageInputProps {
  channelId: number;
  channelThreadId: number | undefined;
  isThreadList: boolean;
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
        image: gif?.images?.fixed_width_small?.url,
        user_id: user.sub,
      },
    });

    setText('');
    setGif(null);
    setdeletedMessage(false);
  };

  const handleGiphyClick = () => {
    setShowGiphyCarousel(!showGiphyCarousel);
  };

  const hideGiphyCarousel = () => {
    setShowGiphyCarousel(false);
  };

  return (
    <div className={props.isThreadList ? classes.rootSingleChip : classes.root}>
      {props.isThreadList ? (
        <Box>
          <Chip
            variant="outlined"
            color="primary"
            size="small"
            icon={<AddGif />}
            label="+Gif"
            onClick={handleGiphyClick}
          />
        </Box>
      ) : (
        ''
      )}
      <Box className={gif ? classes.giphyImage : ''}>
        {gif && (
          <img
            className={classes.image}
            src={gif?.images?.fixed_width_small?.url}
            onClick={() => setGif(null)}
          />
        )}
      </Box>
      <Box>
        <Box
          style={{ display: showGiphyCarousel ? 'flex' : 'none' }}
          className={classes.giphyImage}
          order={1}
          flex="1"
          justifyContent="flex-end"
          alignItems="flex-end"
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
          id="chat-message-input"
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

export default ThreadMessageInput;
