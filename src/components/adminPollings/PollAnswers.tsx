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
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import {
  useWatchGetPollQuestionSubscription,
  useAddAnswerToQuestionMutation,
  useUpdatePollAnswerTextMutation,
} from '../../api/generated/graphql';
import { getPollQuestionAnswers } from '../../atom';
import GetChannels from './GetChannels';
import GetPollAnswerId from './GetPollAnswerId';
import PollAnswerList from './PollAnswerList';
import SetPollQuestionLockState from './SetPollQuestionLockState';
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

  const [addPollQuestionMutation] = useAddAnswerToQuestionMutation();

  useEffect(() => {}, [
    answerText,
    currentAnswerId,
    pollQuestionId,
    pollQuestionActiveState,
    getPollQuestion,
    updatePollAnswerTextMutation,
  ]);

  const handleNewAnswerChange = (index?: number, e?: any) => {
    setAnswerNewText({ text: e.target.value });
    setCurrentAnswerId(e.target.id);
    console.log(index, e.target.value, answerText.text);
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
        <PollAnswerList pollQuestionId={pollQuestionId} />
        <Divider className={classes.divider} />
        <GetChannels />
      </Grid>
    </>
  );
};

export default PollAnswers;
