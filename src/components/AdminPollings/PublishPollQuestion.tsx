import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { currentChannelState } from '../../atom.js';
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
import {
  useWatchChannelPollQuestionSubscription,
  useWatchPollAnswerVotesSubscription,
  useSetPollAnswerVoteMutation
} from '../../api/generated/graphql';

const PublishChannelPolling: React.FC = () => {
  const classes = useStyles();

  const [currentChannel, setCurrentChannelState] = useRecoilState(currentChannelState);
  // console.log('currentChannel', currentChannel);
  const [value, setValue] = React.useState('');
  const [voteError, setVoteError] = React.useState(false);
  const { data, loading } = useWatchChannelPollQuestionSubscription({
    variables: {
      channelId: currentChannel.id
    },
  });
  // console.log('PublishChannelPolling', data);
  const getPollAnswerVotes = useWatchPollAnswerVotesSubscription({
    variables: {
      pollAnswerId: parseInt(value, 10)
    },
  });
  console.log('getPollAnswerVotes', getPollAnswerVotes.data?.pollAnswerVotes[0].votes);


  const [setPollAnswerVoteMutation, { error }] = useSetPollAnswerVoteMutation();

  // console.log('getPollAnswerVotes', getPollAnswerVotes.data?.pollAnswerVotes[0].votes);

  const handleChange = (e: any, value: any) => {
    setValue(e.target.value);
    console.log('radio value', e.target.value, 'pollAnswerId', value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let currentVotes = getPollAnswerVotes.data?.pollAnswerVotes[0].votes;

    if (currentVotes !== undefined) {
      console.log('oldVotes', currentVotes);
      currentVotes++
      console.log('newVotes', currentVotes);
    };

    console.log('Form submitted', value, currentVotes);

    try {
      if (currentVotes === undefined) return;
      await setPollAnswerVoteMutation({
        variables: {
          pollAnswerId: parseInt(value),
          newVote: currentVotes,
        }
      })
    } catch (e) {
      console.log('error on mutation setVotes');

    }
  };

  return (
    <>
      {(data?.getChannelPoll[0] !== undefined) && (

        <Paper className={classes.pollCard}>
          {data?.getChannelPoll.map(channelPoll => (
            <Typography variant="h2" key={channelPoll.id}>{channelPoll.poll_question.text}</Typography>
          ))}

          <form onSubmit={handleSubmit}>
            <FormControl component="fieldset" error={voteError}>
              <RadioGroup aria-label="poll" name="poll" value={value} onChange={handleChange}>
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
      )}
    </>
  )
}

export default PublishChannelPolling;