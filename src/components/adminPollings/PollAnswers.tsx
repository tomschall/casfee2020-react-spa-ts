import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Divider,
  FormGroup,
  InputAdornment,
  TextField,
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import {
  useWatchGetPollQuestionSubscription,
  useAddAnswerToQuestionMutation,
} from '../../api/generated/graphql';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import GetPollAnswerId from './GetPollAnswerId';
import PollAnswerList from './PollAnswerList';
import SetPollQuestionLockState from './SetPollQuestionLockState';
import UpdatePollQuestion from './UpdatePollQuestion';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(5),
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  form: {},
  messageInput: {
    floatingLabelFocusStyle: {
      color: theme.palette.secondary.dark,
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
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
      <Box className={classes.root}>
        <GetPollAnswerId pollQuestionId={parseInt(pollQuestionId)} />
        <UpdatePollQuestion
          pollQuestion={
            getPollQuestion?.data?.poll_question[0]?.text
              ? getPollQuestion?.data?.poll_question[0]?.text
              : 'no value'
          }
          pollQuestionId={parseInt(pollQuestionId)}
          pollQuestionDisabled={
            getPollQuestion?.data?.poll_question[0]?.is_active ? true : false
          }
        />

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
              id="outlined-multiline-static"
              label="Add an answer to these question"
              multiline
              rows={1}
              size="small"
              variant="outlined"
              color="secondary"
              autoComplete="off"
              placeholder="Type your answers here ..."
              disabled={getPollQuestion?.data?.poll_question[0]?.is_active}
              onChange={(e) =>
                handleNewAnswerChange(
                  getPollQuestion?.data?.poll_question[0]?.id,
                  e,
                )
              }
              fullWidth
              inputProps={{
                maxLength: 150,
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      id="message_submit"
                      type="submit"
                      color="secondary"
                      aria-label="Send message"
                      disabled={
                        getPollQuestion?.data?.poll_question[0]?.is_active
                      }
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
        <Divider className={classes.divider} />
        <PollAnswerList pollQuestionId={parseInt(pollQuestionId)} />
        <Divider className={classes.divider} />
        <ButtonGroup disableElevation variant="outlined">
          <Button
            color="secondary"
            component={Link}
            to={'/dashboard'}
            aria-label={`back to dashboard`}
            startIcon={<ArrowBackIosIcon />}
          >
            Back
          </Button>
          <SetPollQuestionLockState
            pollQuestionId={parseInt(pollQuestionId)}
            setActiveState={
              getPollQuestion?.data?.poll_question[0]?.is_active ? true : false
            }
          />
        </ButtonGroup>
      </Box>
    </>
  );
};

export default PollAnswers;
