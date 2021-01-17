import React, { useState, useEffect } from 'react';
import {
  useWatchGetPollAnswersSubscription,
  useUpdatePollAnswerTextMutation,
  useWatchGetPollQuestionSubscription,
} from '../../api/generated/graphql';
import {
  Badge,
  Box,
  Chip,
  FormGroup,
  InputAdornment,
  IconButton,
  TextField,
  Typography,
} from '@material-ui/core';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import UpdateIcon from '@material-ui/icons/Update';
import Alert from '@material-ui/lab/Alert';
import DeleteAnswer from './DeleteAnswer';
import Loader from '../shared/Loader';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  messageInput: {
    floatingLabelFocusStyle: {
      color: theme.palette.secondary.dark,
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
    },
  },
}));

interface PollAnswerListProps {
  pollQuestionId: number;
}

const PollAnswerList: React.FC<PollAnswerListProps> = ({ pollQuestionId }) => {
  const classes = useStyles();
  const [updateEnabled, setUpdateEnabled] = React.useState(true);
  const [answerTextUpdateId, setAnswerTextUpdateId] = React.useState<number>(0);
  const [fieldError, setFieldError] = useState<boolean>(false);
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

  useEffect(() => {
    if (fieldError === true) {
      setTimeout(() => {
        setAnswerText({ text: '' });
        setFieldError(false);
      }, 1000);
    }
  }, [fieldError, answerText]);

  const handleAnswerChange = (
    index?: number,
    e?: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    let text = e?.target.value.trim() || '';
    setAnswerText({ text: text });
    setUpdateEnabled(false);
  };

  const handleUpdateAnswerText = (answerId: number) => {
    setAnswerTextUpdateId(answerId);

    if (answerText.text === '' || !answerText.text.trim()) {
      setUpdateEnabled(false);
      setFieldError(true);
      answerText.text = '';
      return;
    } else {
      setFieldError(false);
    }

    updatePollAnswerTextMutation({
      variables: {
        text: Object.values(answerText)[0],
        pollAnswerId: answerId,
      },
    });
    answerText.text = '';
    setUpdateEnabled(true);
  };

  if (getPollQuestion.loading || loading) {
    return <Loader />;
  }

  return (
    <>
      <Box display="flex" justifyContent="flex-start" alignItems="center">
        <Typography variant="h3">Answers to these question</Typography>
        <Chip
          variant="outlined"
          size="small"
          color="primary"
          label={'Total answers: ' + data?.poll_answers.length}
          style={{ marginLeft: '16px' }}
        />
      </Box>
      {data?.poll_answers.length === 0 ? (
        <Alert severity="info">
          Please add at least two answers to the poll.
        </Alert>
      ) : (
        data?.poll_answers
          .sort((a, b) => a.id - b.id)
          .map((answer) => (
            <FormGroup row key={answer.id}>
              <TextField
                error={fieldError}
                key={answer.id}
                name={answer.text + answer.id}
                required
                disabled={getPollQuestion?.data?.poll_question[0].is_active}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleUpdateAnswerText(answer.id);
                    answerText.text = '';
                  }
                }}
                onChange={(e) => {
                  handleAnswerChange(answer?.id, e);
                  setAnswerTextUpdateId(answer.id);
                }}
                onFocus={(e) => {
                  setFieldError(false);
                  answerText.text = '';
                }}
                onBlur={() => {
                  setFieldError(false);
                }}
                onMouseOut={() => {
                  setFieldError(false);
                }}
                rows={1}
                size="small"
                variant="outlined"
                autoComplete="off"
                placeholder={answer.text}
                label={answer.text}
                fullWidth
                margin="dense"
                inputProps={{
                  maxLength: 250,
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        key={answer.id}
                        id="answer_update"
                        type="submit"
                        color="secondary"
                        aria-label="update_answer_text"
                        onClick={() => {
                          handleUpdateAnswerText(answer.id);
                        }}
                        disabled={
                          answer.id !== answerTextUpdateId
                            ? true
                            : false || updateEnabled === true
                        }
                      >
                        <UpdateIcon />
                      </IconButton>
                      <DeleteAnswer
                        answerId={answer.id}
                        setActiveState={
                          getPollQuestion?.data?.poll_question[0].is_active ||
                          answer.votes !== 0
                            ? true
                            : false
                        }
                      />
                      <Badge
                        badgeContent={answer.votes ? answer.votes : 0}
                        color="secondary"
                      >
                        <HowToVoteIcon color="primary" />
                      </Badge>
                    </InputAdornment>
                  ),
                  classes: {
                    input: classes.messageInput,
                  },
                }}
                InputLabelProps={{
                  shrink: true,
                  className: classes.messageInput,
                }}
              />
            </FormGroup>
          ))
      )}
    </>
  );
};

export default PollAnswerList;
