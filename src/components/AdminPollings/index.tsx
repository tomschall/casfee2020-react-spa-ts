import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Box,
  Button,
  Divider,
  FormGroup,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import HowToVoteIcon from '@material-ui/icons/HowToVote';

import { useAuth0 } from '@auth0/auth0-react';
import { useAddPollQuestionMutation } from '../../api/generated/graphql';
import GetPollQuestions from './GetPollQuestions';

// import Loader from '../../layout/shared/Loader';
// import NotFound from '../../layout/shared/NotFound';
// import Alert from '@material-ui/lab/Alert';
import useStyles from './styles';

interface AdminPollingsProps {
  text?: string;
  owner_id: string;
  title: string;
}

const AdminPollings: React.FC<AdminPollingsProps> = () => {
  const classes = useStyles();
  const { user: userAuth0, isLoading: loadingAuth0 } = useAuth0();
  const [
    addPollQuestionMutation,
    { error, loading, called },
  ] = useAddPollQuestionMutation();
  const [pollTitle, setPollTitle] = React.useState<{ title: string }>({
    title: '',
  });

  const handleChange = (e: any) => {
    setPollTitle({ ...pollTitle, [e.target.id]: e.target.value });
  };

  const handleAddTitle = async (e: any) => {
    e.preventDefault();

    try {
      if (pollTitle.title === '') return;

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
      <Grid item xs={12}>
        <Box className={classes.root} mt={5} mb={3}>
          <Typography variant="h2">Add a new poll</Typography>
        </Box>
        <form
          className={classes.form}
          noValidate
          autoComplete="off"
          onSubmit={handleAddTitle}
        >
          <FormGroup>
            <TextField
              id="title"
              required
              value={pollTitle.title}
              onChange={handleChange}
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
              type="submit"
              value="Add poll title"
              size="medium"
              variant="contained"
              endIcon={<HowToVoteIcon />}
              className={classes.messageButton}
            >
              Add poll
            </Button>
          </FormGroup>
        </form>
        <Divider className={classes.divider} />
      </Grid>
      <Grid item xs={12}>
        <GetPollQuestions question_text={''} question_id={undefined} />
      </Grid>
    </>
  );
};

export default AdminPollings;
