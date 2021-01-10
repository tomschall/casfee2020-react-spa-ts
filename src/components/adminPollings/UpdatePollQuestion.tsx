import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Divider,
  FormGroup,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@material-ui/core';
import UpdateIcon from '@material-ui/icons/Update';
import { useUpdatePollQuestionMutation } from '../../api/generated/graphql';
import { makeStyles } from '@material-ui/core/styles';
import Loader from '../shared/Loader';

const useStyles = makeStyles((theme) => ({
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  form: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  messageInput: {
    floatingLabelFocusStyle: {
      color: theme.palette.secondary.dark,
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
    },
  },
}));

interface UpdatePollQuestionLProps {
  pollQuestion: string;
  pollQuestionId: number;
  pollQuestionDisabled: boolean;
}

const UpdatePollQuestion: React.FC<UpdatePollQuestionLProps> = ({
  pollQuestion,
  pollQuestionId,
  pollQuestionDisabled,
}) => {
  const classes = useStyles();
  const [pollQuestionText, setPollQuestionText] = useState(pollQuestion);
  const [updateDisabled, setUpdateEnabled] = useState<boolean>(true);
  const [fieldError, setFieldError] = useState<boolean>(false);

  const [
    updatePollQuestionMutation,
    { data, loading, error },
  ] = useUpdatePollQuestionMutation({
    variables: {
      pollQuestionId: pollQuestionId,
      text: pollQuestionText,
    },
  });

  const handlePollQuestionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setPollQuestionText(e?.target.value);
    setUpdateEnabled(false);
  };

  const handleUpdatePollQuestion = async () => {
    if (!pollQuestionText.trim() || pollQuestionText === 'no value') {
      setFieldError(true);
      setPollQuestionText('');
      return;
    } else {
      setFieldError(false);
    }

    await updatePollQuestionMutation({
      variables: {
        pollQuestionId: pollQuestionId,
        text: pollQuestionText,
      },
    });
    setPollQuestionText('');
  };

  if (loading || error) {
    return <Loader />;
  }

  return (
    <>
      <Typography variant="h2" style={{ minHeight: '2rem' }}>
        {pollQuestion}
      </Typography>

      <FormGroup row className={classes.form}>
        <TextField
          error={fieldError}
          key={pollQuestionId}
          name="poll_answer"
          value={pollQuestionText === 'no value' ? '' : pollQuestionText}
          required
          id="outlined-multiline-static"
          label={
            fieldError === true
              ? 'Error update question title'
              : 'Update poll question'
          }
          multiline
          rowsMax={4}
          size="small"
          variant="outlined"
          color="secondary"
          autoComplete="off"
          placeholder={pollQuestion}
          disabled={pollQuestionDisabled}
          fullWidth
          onChange={(e) => {
            handlePollQuestionChange(e);
          }}
          onBlur={() => {
            setFieldError(false);
          }}
          onMouseOut={() => {
            setFieldError(false);
          }}
          inputProps={{
            maxLength: 500,
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  key={pollQuestionId}
                  id="question_update"
                  type="submit"
                  color="secondary"
                  aria-label="Update question"
                  disabled={pollQuestionDisabled || updateDisabled}
                  onClick={handleUpdatePollQuestion}
                >
                  <UpdateIcon />
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
      <Divider className={classes.divider} />
    </>
  );
};

export default UpdatePollQuestion;
