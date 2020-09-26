import React from 'react';
import { TextField, Button } from '@material-ui/core';
import { theme } from '../../theme/theme';
import Icon from '@material-ui/core/Icon';
import useStyles from './styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const ChatInput: React.FC = () => {
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

  return (
    <form noValidate autoComplete="off" className={classes.root}>
      <TextField
        value=""
        autoFocus={false}
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
