import React from 'react';
import { useRecoilValue } from 'recoil';
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
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import {
  useWatchGetPollQuestionSubscription,
  useWatchGetPollAnswersSubscription,
  useAddAnswerToQuestionMutation,
  useSetPublishPollQuestionStateMutation,
  useUpdatePollAnswerTextMutation,
} from '../../api/generated/graphql';
import { getPollQuestionAnswers } from '../../atom';
import GetChannels from './GetChannels';
import Loader from '../shared/Loader';
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
    color: theme.palette.error.main,
  },
  stop: {
    color: theme.palette.success.main,
  },
}));

const PollAnswers: React.FC = () => {
  const classes = useStyles();

  // STATES
  const [answerText, setAnswerText] = React.useState({
    text: '',
  });
  const [answerTextUpdateId, setAnswerTextUpdateId] = React.useState<number>(0);
  const [currentAnswerId, setCurrentAnswerId] = React.useState<number>(0);
  const [updateEnabled, setUpdateEnabled] = React.useState(true);
  const pollQuestionId = useRecoilValue(getPollQuestionAnswers);
  const [pollQuestionActiveState] = React.useState();

  const getPollQuestion = useWatchGetPollQuestionSubscription({
    variables: {
      pollQuestionId: pollQuestionId,
    },
  });

  // GRAPHQL MUTATIONS
  const [updatePollAnswerTextMutation] = useUpdatePollAnswerTextMutation({
    variables: {
      text: answerText.text,
      pollAnswerId: answerTextUpdateId,
    },
  });
  const { data } = useWatchGetPollAnswersSubscription({
    variables: {
      pollQuestionId: pollQuestionId,
    },
  });
  const [addPollQuestionMutation] = useAddAnswerToQuestionMutation();
  const [setPollQuestionState] = useSetPublishPollQuestionStateMutation({
    variables: {
      pollQuestionId: pollQuestionId,
      is_active: pollQuestionActiveState,
    },
  });

  // EVENT HANDLING
  const handleAnswerChange = (index?: number, e?: any) => {
    setAnswerText({ text: e.target.value });
    setCurrentAnswerId(e.target.id);
    setUpdateEnabled(false);
    console.log(
      'handleAnswerChange',
      e.target.value,
      answerText.text,
      answerTextUpdateId,
      currentAnswerId,
      updateEnabled,
    );
  };

  const handleUpdateAnswerText = async (answerId: number) => {
    console.log('answertext new value', answerId, Object.values(answerText)[0]);
    setAnswerTextUpdateId(answerId);
    setUpdateEnabled(true);

    if (answerId === undefined || answerText.text === '') return;

    await updatePollAnswerTextMutation({
      variables: {
        text: Object.values(answerText)[0],
        pollAnswerId: answerId,
      },
    });
    answerText.text = '';
  };

  // HANDLE SET POLL QUESTION PUBLISH STATE
  const handleSetPollQuestionPublishState = async () => {
    const getActivePollQuestionState =
      getPollQuestion.data?.poll_question[0].is_active;

    await setPollQuestionState({
      variables: {
        pollQuestionId: pollQuestionId,
        is_active: !getActivePollQuestionState,
      },
    });
  };

  // HANDLE ADD ANSWER
  const handleAddAnswer = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (answerText.text === '') return;
    await addPollQuestionMutation({
      variables: {
        text: answerText.text,
        pollQuestionId: pollQuestionId,
      },
    });
    setAnswerText({ text: '' });
  };

  if (getPollQuestion.loading) {
    return <Loader />;
  }

  return (
    <>
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
          alignItems="flex-end"
          className={classes.root}
          mb={3}
          mt={0}
        >
          <Typography variant="h2">
            {getPollQuestion?.data?.poll_question[0]?.text
              ? getPollQuestion?.data?.poll_question[0]?.text
              : 'no value'}
          </Typography>

          {getPollQuestion?.data?.poll_question[0]?.is_active ? (
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<LockIcon className={classes.play} />}
              onClick={handleSetPollQuestionPublishState}
            >
              locked
            </Button>
          ) : (
            <Button
              variant="text"
              color="primary"
              startIcon={<LockOpenIcon className={classes.stop} />}
              onClick={handleSetPollQuestionPublishState}
            >
              unlock
            </Button>
          )}
        </Box>
        <form
          className={classes.form}
          noValidate
          autoComplete="off"
          onSubmit={handleAddAnswer}
        >
          <FormGroup row>
            <TextField
              key={getPollQuestion?.data?.poll_question[0]?.id}
              name="poll_answer"
              required
              disabled={getPollQuestion?.data?.poll_question[0]?.is_active}
              onChange={(e) =>
                handleAnswerChange(
                  getPollQuestion?.data?.poll_question[0]?.id,
                  e,
                )
              }
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
        </form>
        <Divider className={classes.divider} />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h3">Answers to these question</Typography>
        {data?.poll_answers
          .sort((a, b) => a.id - b.id)
          .map((answer) => (
            <FormGroup row>
              <Grid item xs={8}>
                <TextField
                  key={answer.id}
                  name={answer.text + answer.id}
                  required
                  disabled={getPollQuestion.data?.poll_question[0]?.is_active}
                  onChange={(e) => {
                    handleAnswerChange(answer?.id, e);
                    setAnswerTextUpdateId(answer.id);
                  }}
                  size="medium"
                  variant="outlined"
                  color="secondary"
                  autoComplete="off"
                  placeholder="Type your answers here ..."
                  label={answer.text}
                  fullWidth
                  margin="dense"
                  InputProps={{
                    classes: {
                      input: classes.messageInput,
                    },
                  }}
                  InputLabelProps={{
                    className: classes.messageInput,
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="center"
                >
                  <Button
                    style={{ marginTop: '8px', marginLeft: '8px' }}
                    key={answer.id}
                    variant="contained"
                    size="large"
                    color="secondary"
                    disabled={
                      answer.id !== answerTextUpdateId
                        ? true
                        : false || updateEnabled === true
                    }
                    onBlur={() => {
                      setUpdateEnabled(true);
                    }}
                    onClick={() => {
                      handleUpdateAnswerText(answer.id);
                    }}
                  >
                    Update
                  </Button>
                  <Button
                    style={{ marginTop: '8px', marginLeft: '8px' }}
                    variant="outlined"
                    size="large"
                    color="secondary"
                  >
                    Delete
                  </Button>
                  <Button
                    style={{
                      marginTop: '8px',
                      marginLeft: '8px',
                      whiteSpace: 'nowrap',
                    }}
                    variant="outlined"
                    size="large"
                    color="secondary"
                    disabled={answer.votes !== undefined}
                  >
                    {answer.votes ? answer.votes : 'no votes'}
                  </Button>
                </Box>
              </Grid>
            </FormGroup>
          ))}

        <Divider className={classes.divider} />
        <GetChannels />
      </Grid>
    </>
  );
};

export default PollAnswers;
