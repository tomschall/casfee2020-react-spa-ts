import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import {
  Box,
  Button,
  Divider,
  FormGroup,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import {
  useWatchGetPollQuestionSubscription,
  useWatchGetPollAnswersSubscription,
  useAddAnswerToQuestionMutation,
  useUpdatePollAnswerTextMutation,
} from '../../api/generated/graphql';
import { getPollQuestionAnswers } from '../../atom';
import GetChannels from './GetChannels';
import GetPollAnswerId from './GetPollAnswerId';
import SetPollQuestionLockState from './SetPollQuestionLockState';
import DeleteAnswer from './DeleteAnswer';
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
  lock: {
    color: theme.palette.error.main,
  },
  unlock: {
    color: theme.palette.success.main,
  },
}));

const PollAnswers: React.FC = () => {
  const classes = useStyles();
  const [answerNewText, setAnswerNewText] = React.useState({
    text: '',
  });
  const [answerText, setAnswerText] = React.useState({
    text: '',
  });
  const [answerTextUpdateId, setAnswerTextUpdateId] = React.useState<number>(0);
  const [currentAnswerId, setCurrentAnswerId] = React.useState<number>(0);
  const pollQuestionId = useRecoilValue(getPollQuestionAnswers);
  const [pollQuestionActiveState] = React.useState<boolean>();
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
  const { data, loading } = useWatchGetPollAnswersSubscription({
    variables: {
      pollQuestionId: pollQuestionId,
    },
  });
  console.log(data);
  const [addPollQuestionMutation] = useAddAnswerToQuestionMutation();

  useEffect(() => {}, [
    answerText,
    currentAnswerId,
    pollQuestionId,
    pollQuestionActiveState,
    getPollQuestion,
    updatePollAnswerTextMutation,
    data,
  ]);

  // EVENT HANDLING
  const handleNewAnswerChange = (index?: number, e?: any) => {
    setAnswerNewText({ text: e.target.value });
    setCurrentAnswerId(e.target.id);
    console.log(index, e.target.value, answerText.text);
  };

  const handleAnswerChange = (index?: number, e?: any) => {
    setAnswerText({ text: e.target.value });
    setCurrentAnswerId(e.target.id);
    console.log(index, e.target.value, answerText.text);
  };

  const handleUpdateAnswerText = async (answerId: number) => {
    setAnswerTextUpdateId(answerId);

    if (answerId === undefined || answerText.text === '') return;

    await updatePollAnswerTextMutation({
      variables: {
        text: Object.values(answerText)[0],
        pollAnswerId: answerId,
      },
    });
    answerText.text = '';
  };

  const handleAddAnswer = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (answerNewText.text === '') return;
    await addPollQuestionMutation({
      variables: {
        text: answerNewText.text,
        pollQuestionId: pollQuestionId,
      },
    });

    setAnswerNewText({ text: '' });
  };

  if (getPollQuestion.loading || loading) {
    return <Loader />;
  }

  return (
    <>
      <Grid item xs={12}>
        <Box mt={3} p={0}>
          <GetPollAnswerId pollQuestionId={pollQuestionId} />
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

          <SetPollQuestionLockState
            pollQuestionId={pollQuestionId}
            setActiveState={
              getPollQuestion?.data?.poll_question[0]?.is_active ? true : false
            }
          />
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
              defaultValue=""
              value={answerNewText.text}
              required
              disabled={getPollQuestion?.data?.poll_question[0]?.is_active}
              onChange={(e) =>
                handleNewAnswerChange(
                  getPollQuestion?.data?.poll_question[0]?.id,
                  e,
                )
              }
              onClick={() => {
                setCurrentAnswerId(0);
                setAnswerTextUpdateId(0);
              }}
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
        {data?.poll_answers.length === 0 ? (
          <Alert severity="info">Please add an answer to the poll.</Alert>
        ) : (
          data?.poll_answers
            .sort((a, b) => a.id - b.id)
            .map((answer) => (
              <FormGroup row key={answer.id}>
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
                    onClick={() => {
                      console.log('clicked');
                      answerText.text = '';
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
                      style={{
                        marginTop: '8px',
                        marginLeft: '8px',
                        maxWidth: '100px',
                      }}
                      key={answer.id}
                      variant="contained"
                      size="large"
                      color="secondary"
                      disabled={answer.id !== answerTextUpdateId ? true : false}
                      onClick={() => {
                        handleUpdateAnswerText(answer.id);
                      }}
                    >
                      Update
                    </Button>
                    <DeleteAnswer
                      answerId={answer.id}
                      setActiveState={
                        getPollQuestion?.data?.poll_question[0]?.is_active
                          ? true
                          : false
                      }
                    />
                    <Button
                      style={{
                        marginTop: '8px',
                        marginLeft: '8px',
                        whiteSpace: 'nowrap',
                        maxWidth: '100px',
                        minWidth: '80px',
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
            ))
        )}

        <Divider className={classes.divider} />
        <GetChannels />
      </Grid>
    </>
  );
};

export default PollAnswers;
