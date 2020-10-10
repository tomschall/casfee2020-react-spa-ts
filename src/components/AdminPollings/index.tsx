import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Box,
  Button,
  Divider,
  FormGroup,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  TextField,
  Typography,
  Snackbar,
} from '@material-ui/core';
import Icon from '@material-ui/core/Icon';

import { useAuth0 } from '@auth0/auth0-react';
import { useAddPollQuestionMutation } from '../../api/generated/graphql';
import GetPollQuestions from './GetPollQuestions';

// import Loader from '../../layout/shared/Loader';
// import NotFound from '../../layout/shared/NotFound';
// import Alert from '@material-ui/lab/Alert';

import useStyles from './styles';

const AdminPollings: React.FC = () => {
  const classes = useStyles();
  const { user: userAuth0, isLoading: loadingAuth0 } = useAuth0();
  const [
    addPollQuestionMutation,
    { error, loading, called },
  ] = useAddPollQuestionMutation();
  const { register, handleSubmit, errors } = useForm();
  const [openAlert, setOpenAlert] = React.useState(true);
  const [pollTitle, setPollTitle] = React.useState({
    title: '',
  });

  React.useEffect(() => {
    setOpenAlert(!openAlert);
  }, [errors]);

  const handleChange = (e: any) => {
    // console.log(e.target.id, e.target.value);
    setPollTitle({ ...pollTitle, [e.target.id]: e.target.value });
  };

  const handleAddTitle = async (e: any) => {
    e.preventDefault();

    try {
      console.log('try add poll question');
      const { title } = pollTitle;
      console.log('handleAddTitle', title, userAuth0.sub);
      await addPollQuestionMutation({
        variables: {
          text: pollTitle.title,
          owner_id: userAuth0.sub,
        },
      });
      setPollTitle({ title: '' });
    } catch (e) {
      console.log('error on mutation addPollQuestion');
    }
  };

  // const handleSnackBarClose = (event: any, reason: any) => {
  //   if (reason == 'clickaway') {
  //     return;
  //   }
  //   setOpenAlert(!openAlert);
  // };

  // if (loading) {
  //   return <Loader />;
  // }

  // if (error) {
  //   return <NotFound />;
  // }

  return (
    <>
      <Box className={classes.root}>
        <Typography variant="h2">Add a new poll</Typography>
      </Box>
      <Grid item xs={12}>
        <FormGroup>
          <TextField
            id="title"
            required
            value={pollTitle.title}
            onChange={handleChange}
            // inputRef={register({
            //   required: 'A poll title is required',
            //   maxLength: {
            //     value: 10,
            //     message: 'Title must be shorter than 10 characters',
            //   },
            // })}
            // error={errors.title ? true : false}
            size="medium"
            variant="outlined"
            color="secondary"
            autoComplete="off"
            placeholder="Type your question here ..."
            label="Add a meaningful question"
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
            onClick={handleAddTitle}
            size="medium"
            type={'submit'}
            variant="contained"
            endIcon={<Icon>send</Icon>}
            className={classes.messageButton}
          >
            Submit
          </Button>
        </FormGroup>
        <Divider className={classes.divider} />
      </Grid>
      <Grid item xs={12}>
        <GetPollQuestions />
      </Grid>
    </>
  );
};

export default AdminPollings;
