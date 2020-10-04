import React, { useState } from 'react';
import {
  Box,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
} from '@material-ui/core';
import { useGetPollQuestionsQuery } from '../../api/generated/graphql';
import Loader from '../../layout/shared/Loader';
import NotFound from '../../layout/shared/NotFound';
import useStyles from './styles';

const AdminPollings: React.FC = () => {
  const classes = useStyles();
  const { data, loading, error } = useGetPollQuestionsQuery({
    variables: {},
  });

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <NotFound />;
  }

  return (
    <>
      <Box className={classes.root}>
        <h2>Pollings</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos dolorum
          magnam, earum aliquid commodi voluptates officia in, eos ex ipsam quae
          ratione nesciunt porro qui vitae rem praesentium esse. Ipsa!
        </p>
      </Box>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel htmlFor="my-input">Question</InputLabel>
          <Input id="my-input" aria-describedby="my-helper-text" />
          <FormHelperText id="my-helper-text">
            Add a meaningful question to the poll.
          </FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        {data?.questions.map((question) => (
          <p>{question.text}</p>
        ))}
      </Grid>
    </>
  );
};

export default AdminPollings;
