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
  const [answerText, setAnswerText] = React.useState({
    text: '',
  });
  const [answerTextUpdateId, setAnswerTextUpdateId] = React.useState<number>(0);
  const pollQuestionId = useRecoilValue(getPollQuestionAnswers);
  const getPollQuestion = useWatchGetPollQuestionSubscription({
    variables: {
      pollQuestionId: pollQuestionId,
    },
  });
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
  const [pollQuestionActiveState] = React.useState();
  const [addPollQuestionMutation, { error }] = useAddAnswerToQuestionMutation();

  const [setPollQuestionState] = useSetPublishPollQuestionStateMutation({
    variables: {
      pollQuestionId: pollQuestionId,
      is_active: pollQuestionActiveState,
    },
  });

  const handleAnswerChange = (e: any) => {
    setAnswerText({ ...answerText, [e.target.id]: e.target.value });
    console.log('handleAnswerChange', answerText);
  };

  const handleUpdateAnswerText = async (answerId: number) => {
    console.log('answertext new value', answerId, Object.values(answerText)[0]);

    setAnswerTextUpdateId(answerId);

    if (answerId === undefined) return;

    await updatePollAnswerTextMutation({
      variables: {
        text: Object.values(answerText)[0],
        pollAnswerId: answerId,
      },
    });
  };

  // HANDLE SET POLL QUESTION PUBLISH STATE
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

  // HANDLE ADD ANSWER
  const handleAddAnswer = async (e: React.FormEvent<HTMLFormElement>) => {
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
          <FormGroup row>
            <TextField
              id="text"
              name="poll_answer"
              required
              disabled={getPollQuestion?.data?.poll_question[0]?.is_active}
              value={answerText.text}
              onChange={handleAnswerChange}
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
          {data?.poll_answers.map((answer) => (
            <FormGroup row>
              <TextField
                id={JSON.stringify(answer.id)}
                key={answer.id}
                name={answer.text + answer.id}
                required
                disabled={getPollQuestion.data?.poll_question[0]?.is_active}
                onChange={handleAnswerChange}
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
              <>
                <Button
                  variant="outlined"
                  onClick={() => {
                    handleUpdateAnswerText(answer.id);
                  }}
                >
                  Test
                </Button>
              </>
            </FormGroup>
          ))}
          <Divider className={classes.divider} />
          <GetChannels />
        </Grid>
      </form>
    </>
  );
};

export default PollAnswers;
