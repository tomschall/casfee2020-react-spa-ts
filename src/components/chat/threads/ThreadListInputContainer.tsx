import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {
  Button,
  Box,
  Chip,
  Container,
  Grid,
  InputAdornment,
  IconButton,
  TextField,
} from '@material-ui/core';
import { theme } from '../../../theme/theme';
import Icon from '@material-ui/core/Icon';
import SendIcon from '@material-ui/icons/Send';
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
import AddGif from '@material-ui/icons/Gif';

const useStyles = makeStyles((theme) => ({
  giphyVisible: {
    marginTop: theme.spacing(2),
  },
  giphyHidden: {
    display: 'none',
    marginTop: theme.spacing(2),
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
    [theme.breakpoints.down('md')]: {
      fontSize: '1rem',
    },
    '&.MuiFormLabel-root.Mui-focused': {
      color: theme.palette.secondary.main,
    },
  },
  image: {
    maxHeight: 55,
    paddingRight: theme.spacing(1),
  },
  giphyButton: {
    marginRight: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      height: 56,
    },
    [theme.breakpoints.down('md')]: {
      height: 40,
    },
  },
}));

interface ThreadListInputContainerProps {
  channelId: number;
  channelThreadId: number | undefined;
}

const ThreadListInputContainer: React.FC<ThreadListInputContainerProps> = (
  props,
) => {
  const classes = useStyles();

  const matches = useMediaQuery(theme.breakpoints.up('md'));

  const [openGiphy, setOpenGiphy] = React.useState<boolean>(false);

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

  const handleGiphyClick = () => {
    setShowGiphyCarousel(!showGiphyCarousel);
    setOpenGiphy(!openGiphy);
  };

  const hideGiphyCarousel = () => {
    setShowGiphyCarousel(false);
    setOpenGiphy(!openGiphy);
  };

  return (
    <>
      <Grid item xs={12} className={gif ? classes.giphyImage : ''}>
        {gif && (
          <img
            className={classes.image}
            alt={gif?.bitly_url}
            src={gif?.images?.fixed_width?.url}
            onClick={() => setGif(null)}
          />
        )}
      </Grid>
      <Grid
        item
        xs={12}
        className={
          showGiphyCarousel ? classes.giphyVisible : classes.giphyHidden
        }
      >
        <GiphyCarousel hideGiphyCarousel={() => hideGiphyCarousel()} />
      </Grid>
      <Box display="flex" justifyContent="flex-end" alignItems="flex-end">
        <Box>
          <Button
            variant="outlined"
            color={openGiphy === false ? 'primary' : 'secondary'}
            onClick={handleGiphyClick}
            className={classes.giphyButton}
            aria-label="add giphy"
          >
            <AddGif />
          </Button>
        </Box>
        <Box flex={16} justifyContent="flex-end">
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
              id={`chat-message-input-${props.channelThreadId}`}
              label={'Crackle your message here ...'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      type="submit"
                      color="secondary"
                      aria-label="send message"
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
      </Box>
    </>
  );
};

export default ThreadListInputContainer;
