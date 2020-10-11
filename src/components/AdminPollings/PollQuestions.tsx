import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useForm } from 'react-hook-form';
import { getPollQuestionAnswers } from '../../atom';
import {
  Box,
  Button,
  Divider,
  FormGroup,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  TextField,
  Typography,
  Snackbar,
} from '@material-ui/core';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import { useAuth0 } from '@auth0/auth0-react';
import { useAddAnswerToQuestionMutation } from '../../api/generated/graphql';
import {
  useWatchGetPollQuestionSubscription,
  useWatchGetPollAnswersSubscription,
} from '../../api/generated/graphql';
import useStyles from './styles';

const PollQuestions: React.FC = () => {
  const classes = useStyles();
  const { user: userAuth0, isLoading: loadingAuth0 } = useAuth0();
  const { register, handleSubmit, errors } = useForm();
  const [answerText, setAnswerText] = React.useState({
    text: '',
  });

  const [pollQuestionId, setPollQuestion] = useRecoilState<any>(
    getPollQuestionAnswers,
  );

  const questionTitle = useWatchGetPollQuestionSubscription({
    variables: {
      pollQuestionId: pollQuestionId,
    },
  });

  console.log('questionTitle', questionTitle.data?.poll_question[0].text);

  console.log('questionTitle', questionTitle);

  const { data } = useWatchGetPollAnswersSubscription({
    variables: {
      pollQuestionId: pollQuestionId,
    },
  });

  const [
    addPollQuestionMutation,
    { error, loading, called },
  ] = useAddAnswerToQuestionMutation();

  // const [openAlert, setOpenAlert] = React.useState(true);

  const handleAnswerChange = (e: any) => {
    console.log(e.target.value);
    setAnswerText({ ...answerText, [e.target.id]: e.target.value });
  };

  const handleAddAnswer = async (e: any) => {
    e.preventDefault();

    try {
      if (answerText.text === '') return;
      await addPollQuestionMutation({
        variables: {
          text: answerText.text,
          pollQuestionId: pollQuestionId,
        },
      });
      setAnswerText({ text: '' });
    } catch (e) {
      console.log('error on mutation addPollQuestion');
    }
  };

  return (
    <>
      <form
        className={classes.form}
        noValidate
        autoComplete="off"
        onSubmit={handleAddAnswer}
      >
        <Grid item xs={12}>
          <Box className={classes.root} mb={3} mt={5}>
            <Typography variant="h2">
              {questionTitle.data?.poll_question[0].text}
            </Typography>
          </Box>
          <FormGroup>
            <TextField
              id="text"
              required
              value={answerText.text}
              onChange={handleAnswerChange}
              inputRef={register({
                required: 'A poll title is required',
                maxLength: {
                  value: 10,
                  message: 'Title must be shorter than 10 characters',
                },
              })}
              error={errors.title ? true : false}
              size="medium"
              variant="outlined"
              color="secondary"
              autoComplete="off"
              placeholder="Type your answers here ..."
              label="Add a meaningful answer"
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
            <Button
              type="submit"
              value="Add poll title"
              size="medium"
              variant="contained"
              endIcon={<HowToVoteIcon />}
              className={classes.messageButton}
            >
              Add answer
            </Button>
          </FormGroup>

          <Divider className={classes.divider} />
        </Grid>
        <Grid item xs={12}>
          <FormGroup>
            {data?.poll_answers.map((answer) => (
              <TextField
                id={JSON.stringify(answer.id)}
                required
                value=""
                // onChange={handleAnswerChange}
                size="medium"
                variant="outlined"
                color="secondary"
                autoComplete="off"
                placeholder="Type your answers here ..."
                label={answer.text}
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
            ))}
          </FormGroup>
        </Grid>
      </form>
    </>
  );
};

export default PollQuestions;
