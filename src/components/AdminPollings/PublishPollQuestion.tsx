import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import PropTypes from 'prop-types';
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

  const totalVotes = () => {
    let numbers: any = [];
    numbers = data?.getChannelPoll[0] !== undefined && data?.getChannelPoll[0].poll_question.poll_anwers;

    const count: any = [];
    numbers.map((num: any) => count.push(num.votes));

    const result = count.reduce((a: any, b: any) => a + b);

    return result;
  }

  if (loading) {
    return <Loader />;
  }

  const LinearProgressWithLabel = (props: any) => {
    return (
      <Box width="100%" display="flex" justifyContent="center" alignItems="center" flexDirection="row">
        <Box width="100%" mr={1}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box minWidth={0}>
          <Typography variant="body2" color="textSecondary">{`${Math.round(
            props.value
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }

  LinearProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate and buffer variants.
     * Value between 0 and 100.
     */
    value: totalVotes,
  };

  // HANDLE EVENTS
  const handleChange = (e: any, value: any) => {
    setValue(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let currentPollAnswerVotes = await getPollAnswerVotes.data?.pollAnswerVotes[0].votes;

    if (currentPollAnswerVotes !== undefined) {
      currentPollAnswerVotes++
    };

    try {
      if (currentPollAnswerVotes === undefined) return;
      await setPollAnswerVoteMutation({
        variables: {
          pollAnswerId: parseInt(value),
          newVote: currentPollAnswerVotes,
        }
      })

      setHasVoted(true);

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
                  <Typography variant="caption">Voting results! Total votes: {totalVotes()}</Typography>
                  {data?.getChannelPoll.map(channelPoll => (
                    <Typography variant="h2" key={channelPoll.id}>{channelPoll.poll_question.text}</Typography>
                  ))}
                </Box>

                {data?.getChannelPoll[0] !== undefined && data?.getChannelPoll[0].poll_question.poll_anwers
                  .sort((a, b) => a.id > b.id ? 1 : -1)
                  .map(pollVotes => {

                    return (
                      <Box key={pollVotes.id} width="100%" display="flex" alignItems="flex-start" flexDirection="column">
                        <Typography variant="body2">{pollVotes.text}</Typography>
                        <LinearProgressWithLabel value={Math.round(100 * pollVotes.votes) / totalVotes()} />
                      </Box>
                    )
                  })}
              </Paper>
            )}
          </>
        )}
    </>
  )
}

export default PublishChannelPolling;