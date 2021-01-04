import React, { useEffect } from 'react';
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

  const handleChange = (e: any) => {
    setPollTitle({ ...pollTitle, [e.target.id]: e.target.value });
  };

  const handleAddTitle = async (e: any) => {
    e.preventDefault();

    if (pollTitle.title === '') return;

    await addPollQuestionMutation({
      variables: {
        text: pollTitle.title,
        owner_id: userAuth0.sub,
      },
    });

    setPollTitle({ title: '' });
  };

  useEffect(() => {}, [pollTitle]);

  return (
    <>
      <Box className={classes.root}>
        <Typography variant="h2" style={{ paddingBottom: theme.spacing(1) }}>
          Add a new poll
        </Typography>
        <form
          className={classes.form}
          noValidate
          autoComplete="off"
          onSubmit={handleAddTitle}
        >
          <FormGroup>
            <TextField
              id="title"
              required
              value={pollTitle.title}
              onChange={handleChange}
              size="medium"
              variant="outlined"
              color="secondary"
              autoComplete="off"
              placeholder="Type your question here ..."
              label="Add a meaningful question"
              fullWidth
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
