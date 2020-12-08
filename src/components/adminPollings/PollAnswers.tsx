import React from 'react';
import { useParams } from 'react-router-dom';
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
} from '../../api/generated/graphql';
import GetChannels from './GetChannels';
import GetPollAnswerId from './GetPollAnswerId';
import PollAnswerList from './PollAnswerList';
import SetPollQuestionLockState from './SetPollQuestionLockState';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
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
}));

interface ParamType {
  question: string;
}

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
  const { question: pollQuestionId } = useParams<ParamType>();
  const [pollQuestionActiveState] = React.useState<boolean>();

  const getPollQuestion = useWatchGetPollQuestionSubscription({
    variables: {
      pollQuestionId: parseInt(pollQuestionId),
    },
  });

  const [addPollQuestionMutation] = useAddAnswerToQuestionMutation();

  const handleNewAnswerChange = (index?: number, e?: any) => {
    setAnswerNewText({ text: e.target.value });
    setCurrentAnswerId(e.target.id);
  };

  const handleAddAnswer = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (answerNewText.text === '') return;
    await addPollQuestionMutation({
      variables: {
        text: answerNewText.text,
        pollQuestionId: parseInt(pollQuestionId),
      },
    });

    setAnswerNewText({ text: '' });
  };

  return (
    <>
      <Grid item xs={12}>
        <Box mt={3} p={0}>
          <GetPollAnswerId pollQuestionId={parseInt(pollQuestionId)} />
        </Box>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-end"
          mb={3}
          mt={0}
        >
          <Typography variant="h2">
            {getPollQuestion?.data?.poll_question[0]?.text
              ? getPollQuestion?.data?.poll_question[0]?.text
              : 'no value'}
          </Typography>

          <SetPollQuestionLockState
            pollQuestionId={parseInt(pollQuestionId)}
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
              inputProps={{
                maxLength: 100,
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
        <PollAnswerList pollQuestionId={parseInt(pollQuestionId)} />
        <Divider className={classes.divider} />
        <GetChannels questionId={currentAnswerId} />
      </Grid>
    </>
  );
};

export default PollAnswers;
