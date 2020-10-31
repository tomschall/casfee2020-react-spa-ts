import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import useStyles from './styles';
import {
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormHelperText,
  FormLabel,
  Paper,
  Typography
} from '@material-ui/core';
import { useWatchChannelPollQuestionSubscription } from '../../api/generated/graphql';

const PublishChannelPolling: React.FC = () => {
  const classes = useStyles();

  const [value, setValue] = React.useState<string>('');
  const [error, setError] = React.useState(false);
  const { data, loading } = useWatchChannelPollQuestionSubscription({
    variables: {
      channelId: 1
    },
  });
  console.log('PublishChannelPolling', data);

  const handleChange = (e: any, value: any) => {
    setValue(e.target.value);
    console.log('radio value', e.target.value, 'pollAnswerId', value);

  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('Form submitted', value);
  }

  return (
    <>
      <Paper className={classes.pollCard}>
        {data?.getChannelPoll.map(channelPoll => (
          <Typography variant="h2" key={channelPoll.id}>{channelPoll.poll_question.text}</Typography>
        ))}

        <form onSubmit={handleSubmit}>
          <FormControl component="fieldset" error={error}>
            <RadioGroup aria-label="quiz" name="quiz" value={value} onChange={handleChange}>
              {data?.getChannelPoll[0].poll_question.poll_anwers.map(pollAnswer => (
                <FormControlLabel key={pollAnswer.id} value={pollAnswer.id} control={
                  <Radio
                    value={JSON.stringify(pollAnswer.id)}
                    checked={value === JSON.stringify(pollAnswer.id)}
                    onChange={handleChange}
                  />} label={pollAnswer.text} />
              ))}
            </RadioGroup>
            <Button type="submit" variant="contained" color="secondary" className={classes.pollSubmit}>
              Vote
            </Button>
          </FormControl>
        </form>

      </Paper>
    </>
  )
}

export default PublishChannelPolling;