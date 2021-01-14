import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useAddPollQuestionMutation } from '../../api/generated/graphql';
import { theme } from '../../theme/theme';
import {
  Box,
  FormGroup,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@material-ui/core';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import SendIcon from '@material-ui/icons/Send';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  form: {},
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
}));

const AddPollQuestion: React.FC = () => {
  const classes = useStyles();
  const { user: userAuth0 } = useAuth0();
  const [addPollQuestionMutation] = useAddPollQuestionMutation();
  const [pollTitle, setPollTitle] = React.useState<{ title: string }>({
    title: '',
  });
  const [fieldError, setFieldError] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setPollTitle({ ...pollTitle, [e.target.id]: e.target.value });
  };

  const handleAddTitle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (pollTitle.title === '' || !pollTitle.title.trim()) {
      setFieldError(true);
      pollTitle.title = '';
      return;
    } else {
      setFieldError(false);
    }

    await addPollQuestionMutation({
      variables: {
        text: pollTitle.title.trim(),
        owner_id: userAuth0.sub,
      },
    });

    setPollTitle({ title: '' });
  };

  return (
    <>
      <Box className={classes.root}>
        <Typography variant="h2" style={{ paddingBottom: theme.spacing(2) }}>
          Add new poll
        </Typography>
        <form
          className={classes.form}
          noValidate
          autoComplete="off"
          onSubmit={handleAddTitle}
        >
          <FormGroup>
            <TextField
              error={fieldError}
              id="title"
              key={1}
              required
              value={pollTitle.title}
              onChange={(e) => handleChange(e)}
              size="small"
              variant="outlined"
              multiline
              rows={1}
              color="secondary"
              autoComplete="off"
              placeholder="Type your question here ..."
              onFocus={() => {
                setFieldError(false);
              }}
              label={
                fieldError === true
                  ? 'Error adding question'
                  : 'Add an meaningfull question'
              }
              fullWidth
              inputProps={{
                maxLength: 200,
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      id="message_submit"
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
          </FormGroup>
        </form>
      </Box>
    </>
  );
};

export default AddPollQuestion;
