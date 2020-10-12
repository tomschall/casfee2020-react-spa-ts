import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useForm } from 'react-hook-form';
import {
  Badge,
  Box,
  Button,
  Chip,
  Divider,
  FormGroup,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import { useAuth0 } from '@auth0/auth0-react';
import { useAddAnswerToQuestionMutation } from '../../api/generated/graphql';
import {
  useWatchGetPollQuestionSubscription,
  useWatchGetPollAnswersSubscription,
} from '../../api/generated/graphql';
import { getPollQuestionAnswers } from '../../atom';
import GetPublicChannels from './GetPublicChannels';
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

  const getPollQuestion = useWatchGetPollQuestionSubscription({
    variables: {
      pollQuestionId: pollQuestionId,
    },
  });

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
      console.log(error, 'error on mutation addPollQuestion');
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
          <Box mt={3} p={0}>
            <Chip
              color="secondary"
              size="small"
              variant="outlined"
              label={
                'Poll question id: ' + getPollQuestion.data?.poll_question[0].id
              }
            />
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
            className={classes.root}
            mb={3}
            mt={0}
          >
            <Typography variant="h2">
              {getPollQuestion.data?.poll_question[0].text}
            </Typography>

            {getPollQuestion.data?.poll_question[0].is_active ? (
              <Button
                variant="text"
                color="primary"
                startIcon={<PlayArrowIcon className={classes.play} />}
              >
                Active
              </Button>
            ) : (
              <Button
                variant="text"
                color="secondary"
                startIcon={<StopIcon className={classes.stop} />}
              >
                Inactive
              </Button>
            )}
          </Box>
          <FormGroup row>
            <TextField
              id="text"
              required
              disabled={getPollQuestion.data?.poll_question[0].is_active}
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
              label="Add an answer to these question"
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
          <Typography variant="h3">Answers to these question</Typography>
          <FormGroup>
            {data?.poll_answers.map((answer) => (
              <TextField
                id={JSON.stringify(answer.id)}
                required
                value=""
                disabled={getPollQuestion.data?.poll_question[0].is_active}
                // onChange={handleAnswerChange}
                size="medium"
                variant="standard"
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
          <Divider className={classes.divider} />
          <GetPublicChannels />
        </Grid>
      </form>
    </>
  );
};

export default PollQuestions;