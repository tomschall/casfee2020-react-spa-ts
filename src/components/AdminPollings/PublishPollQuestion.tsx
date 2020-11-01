import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { currentChannelState } from '../../atom.js';
import Loader from '../../layout/shared/Loader';
import useStyles from './styles';
import {
  Box,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  LinearProgress,
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

  const [value, setValue] = React.useState('');

  const [voteError, setVoteError] = React.useState(false);

  const [hasVoted, setHasVoted] = React.useState(false);
  console.log('hasVoted', hasVoted);


  const { data, loading } = useWatchChannelPollQuestionSubscription({
    variables: {
      channelId: currentChannel.id
    },
  });

  const getPollAnswerVotes = useWatchPollAnswerVotesSubscription({
    variables: {
      pollAnswerId: parseInt(value, 10)
    },
  });

  const [setPollAnswerVoteMutation, { error }] = useSetPollAnswerVoteMutation();

  if (loading) {
    return <Loader />;
  }

  // HANDLE EVENTS
  const handleChange = (e: any, value: any) => {
    setValue(e.target.value);
    console.log('radio value', e.target.value, 'pollAnswerId', value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let currentPollAnswerVotes = await getPollAnswerVotes.data?.pollAnswerVotes[0].votes;

    if (currentPollAnswerVotes !== undefined) {
      currentPollAnswerVotes++
    };

    console.log('Form submitted', value, currentPollAnswerVotes);

    try {
      if (currentPollAnswerVotes === undefined) return;
      await setPollAnswerVoteMutation({
        variables: {
          pollAnswerId: parseInt(value),
          newVote: currentPollAnswerVotes,
        }
      })

      setHasVoted(true);
      console.log('hasVoted', hasVoted);


    } catch (e) {
      console.log('error on mutation setVotes');

    }
  };

  return (
    <>

      {(data?.getChannelPoll[0] !== undefined) && hasVoted === false ? (
        <Paper className={classes.pollCard}>

          { data?.getChannelPoll.map(channelPoll => (
            <Typography variant="h2" key={channelPoll.id}>{channelPoll.poll_question.text}</Typography>
          ))}

          <form onSubmit={handleSubmit}>
            <FormControl component="fieldset" error={voteError}>
              <RadioGroup aria-label="poll" name="poll" value={value} onChange={handleChange}>
                {data?.getChannelPoll[0].poll_question.poll_anwers
                  .sort((a, b) => a.id > b.id ? 1 : -1)
                  .map(pollAnswer => (
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
      ) : (
          <>
            {data?.getChannelPoll[0] !== undefined && (
              <Paper className={classes.pollCard}>

                <Box width="100%" mb={3}>
                  <Typography variant="caption">Voting results!</Typography>
                  {data?.getChannelPoll.map(channelPoll => (
                    <Typography variant="h2" key={channelPoll.id}>{channelPoll.poll_question.text}</Typography>
                  ))}
                </Box>

                {data?.getChannelPoll[0] !== undefined && data?.getChannelPoll[0].poll_question.poll_anwers
                  .sort((a, b) => a.id > b.id ? 1 : -1)
                  .map(pollVotes => (
                    <Box display="flex" alignItems="flex-start" flexDirection="column">
                      <Box width="100%">
                        <Typography variant="body2">{pollVotes.text}</Typography>
                      </Box>

                      <Box display="flex" alignItems="center" justifyContent="center" flexDirection="row">
                        <Box width={pollVotes.votes} mr={1}>
                          <LinearProgress
                            variant="determinate" {...pollVotes.votes !== undefined && pollVotes.votes} />
                        </Box>
                        <Box minWidth={35}>
                          <Typography variant="body1" color="secondary">
                            {`${Math.round(pollVotes.votes)}%`}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  ))}

              </Paper>
            )}
          </>
        )}
    </>
  )
}

export default PublishChannelPolling;