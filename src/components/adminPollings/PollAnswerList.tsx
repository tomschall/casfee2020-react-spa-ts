import React, { useEffect } from 'react';
import {
  useWatchGetPollAnswersSubscription,
  useUpdatePollAnswerTextMutation,
  useWatchGetPollQuestionSubscription,
} from '../../api/generated/graphql';
import {
  Box,
  Button,
  FormGroup,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import DeleteAnswer from './DeleteAnswer';
import Loader from '../shared/Loader';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
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

interface PollAnswerListProps {
  pollQuestionId: number;
}

const PollAnswerList: React.FC<PollAnswerListProps> = ({ pollQuestionId }) => {
  const classes = useStyles();
  const [answerTextUpdateId, setAnswerTextUpdateId] = React.useState<number>(0);
  const [answerText, setAnswerText] = React.useState({
    text: '',
  });
  const getPollQuestion = useWatchGetPollQuestionSubscription({
    variables: {
      pollQuestionId: pollQuestionId,
    },
  });
  const { data, loading } = useWatchGetPollAnswersSubscription({
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

  useEffect(() => {}, [answerTextUpdateId, answerText, data]);

  const handleAnswerChange = (index?: number, e?: any) => {
    setAnswerText({ text: e.target.value });
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

  if (getPollQuestion.loading || loading) {
    return <Loader />;
  }

  return (
    <>
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
                  disabled={getPollQuestion?.data?.poll_question[0].is_active}
                  onChange={(e) => {
                    handleAnswerChange(answer?.id, e);
                    // setAnswerTextUpdateId(answer.id);
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
                    disabled={getPollQuestion?.data?.poll_question[0].is_active}
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
    </>
  );
};

export default PollAnswerList;
