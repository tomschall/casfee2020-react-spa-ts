import React from 'react';
import { useRecoilState } from 'recoil';
import { useForm } from 'react-hook-form';
import {
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
// import StopIcon from '@material-ui/icons/Stop';
// import { useAuth0 } from '@auth0/auth0-react';
import {
  useWatchGetPollQuestionSubscription,
  useWatchGetPollAnswersSubscription,
  useAddAnswerToQuestionMutation,
  useSetPublishPollQuestionStateMutation,
} from '../../api/generated/graphql';
import { getPollQuestionAnswers } from '../../atom';
import GetPublicChannels from './GetPublicChannels';
import Loader from '../../components/shared/Loader';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {},
  divider: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
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
  play: {
    color: theme.palette.success.main,
  },
  stop: {
    color: theme.palette.error.main,
  },
}));

const PollQuestions: React.FC = () => {
  const classes = useStyles();

  const { register, errors } = useForm();

  const [answerText, setAnswerText] = React.useState({
    text: '',
  });

  const [pollQuestionId, setPollQuestion] = useRecoilState(
    getPollQuestionAnswers,
  );

  const getPollQuestion = useWatchGetPollQuestionSubscription({
    variables: {
      pollQuestionId: pollQuestionId,
    },
  });

  console.log('getPollQuestion', getPollQuestion);

  const { data } = useWatchGetPollAnswersSubscription({
    variables: {
      pollQuestionId: pollQuestionId,
    },
  });

  console.log('useWatchGetPollAnswersSubscription', data);

  const [pollQuestionActiveState, setPollQuestionActiveState] = React.useState<
    boolean
  >();

  const [addPollQuestionMutation, { error }] = useAddAnswerToQuestionMutation();

  const handleAnswerChange = (e: any) => {
    console.log(e.target.value);
    setAnswerText({ ...answerText, [e.target.id]: e.target.value });
  };

  const [setPollQuestionState] = useSetPublishPollQuestionStateMutation({
    variables: {
      pollQuestionId: pollQuestionId,
      is_active: pollQuestionActiveState,
    },
  });

  const handleSetPollQuestionPublishState = async () => {
    // console.log('set state clicked', getPollQuestion.data?.poll_question[0].is_active);
    const getActivePollQuestionState =
      getPollQuestion.data?.poll_question[0].is_active;

    try {
      await setPollQuestionState({
        variables: {
          pollQuestionId: pollQuestionId,
          is_active: !getActivePollQuestionState,
        },
      });
    } catch (e) {
      console.log(error, 'error on mutation addPollQuestion');
    }
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

  if (getPollQuestion.loading) {
    return <Loader />;
  }

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
              label={'Poll question id: ' + pollQuestionId}
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
                variant="outlined"
                color="secondary"
                startIcon={<PlayArrowIcon className={classes.play} />}
                onClick={handleSetPollQuestionPublishState}
              >
                Published
              </Button>
            ) : (
              <Button
                variant="text"
                color="primary"
                startIcon={<PlayArrowIcon className={classes.stop} />}
                onClick={handleSetPollQuestionPublishState}
              >
                Not published
              </Button>
            )}
          </Box>
          <FormGroup row>
            <TextField
              id="text"
              name="poll_answer"
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
                key={answer.id}
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
