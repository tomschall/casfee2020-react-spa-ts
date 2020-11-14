import React from 'react';
import { useRecoilState } from 'recoil';
import { currentChannelState } from '../../atom.js';
import Loader from '../shared/Loader';
import {
  Box,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  LinearProgress,
  Paper,
  Typography,
} from '@material-ui/core';
import {
  useWatchChannelPollQuestionSubscription,
  useWatchPollAnswerVotesSubscription,
  useWatchCheckUserHasVotedSubscription,
  useSetPollAnswerVoteMutation,
} from '../../api/generated/graphql';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {},
  pollCard: {
    padding: theme.spacing(5),
  },
  pollSubmit: {
    marginTop: theme.spacing(3),
  },
}));

interface PublishChannelProps {
  data?: [] | undefined;
}

const PublishChannelPolling: React.FC<PublishChannelProps> = () => {
  const classes = useStyles();
  const [currentChannel, setCurrentChannelState] = useRecoilState(
    currentChannelState,
  );
  const [value, setValue] = React.useState('');
  const [voteError] = React.useState(false);
  const [hasVoted, setHasVoted] = React.useState(false);
  const { data, loading } = useWatchChannelPollQuestionSubscription({
    variables: {
      channelId: currentChannel.id,
    },
  });
  const getPollAnswerVotes = useWatchPollAnswerVotesSubscription({
    variables: {
      pollAnswerId: parseInt(value, 10),
    },
  });
  const [setPollAnswerVoteMutation] = useSetPollAnswerVoteMutation();
  const totalVotes = () => {
    let numbers: any = [];
    numbers = data?.getChannelPoll[0]?.poll_question?.poll_anwers;
    const count: any = [];
    numbers.map((num: any) => count.push(num.votes));
    const result = count.reduce((a: any, b: any) => a + b);
    return result;
  };

  const { data: userVotes } = useWatchCheckUserHasVotedSubscription({
    variables: {
      pollQuestionId: data?.getChannelPoll[0]?.poll_question?.id,
    },
  });

  if (loading) {
    return <Loader />;
  }

  console.log(
    'user has voted',
    userVotes?.user_votes[0]?.poll_question_id,
    data?.getChannelPoll[0]?.poll_question?.id,
  );

  const LinearProgressWithLabel = (props: any) => {
    return (
      <Box
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="row"
      >
        <Box width="100%" mr={1}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box minWidth={0}>
          <Typography variant="body2" color="textSecondary">
            {props.value.toFixed(1)}%
          </Typography>
        </Box>
      </Box>
    );
  };

  LinearProgressWithLabel.propTypes = {
    value: () => null,
  };

  // HANDLE EVENTS
  const handleChange = (e: any, value: any) => {
    setValue(e.target.value);
  };

  // HANDLE SUBMIT
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('hasVoted', hasVoted);

    let currentPollAnswerVotes = await getPollAnswerVotes.data
      ?.pollAnswerVotes[0].votes;

    if (currentPollAnswerVotes !== undefined) {
      currentPollAnswerVotes++;
    }

    if (currentPollAnswerVotes === undefined) return;
    await setPollAnswerVoteMutation({
      variables: {
        pollAnswerId: parseInt(value),
        newVote: currentPollAnswerVotes,
      },
    });

    setHasVoted(true);
  };

  return (
    <>
      {data?.getChannelPoll[0] &&
      hasVoted === false &&
      userVotes?.user_votes[0]?.poll_question_id !==
        data?.getChannelPoll[0]?.poll_question?.id ? (
        <Paper className={classes.pollCard}>
          {data?.getChannelPoll.map((channelPoll) => (
            <Typography variant="h2" key={channelPoll.id}>
              {channelPoll?.poll_question?.text}
            </Typography>
          ))}

          <form onSubmit={handleSubmit}>
            <FormControl component="fieldset" error={voteError}>
              <RadioGroup
                aria-label="poll"
                name="poll"
                value={value}
                onChange={handleChange}
              >
                {data?.getChannelPoll[0]?.poll_question?.poll_anwers
                  .sort((a, b) => (a.id > b.id ? 1 : -1))
                  .map((pollAnswer) => (
                    <FormControlLabel
                      key={pollAnswer.id}
                      value={pollAnswer.id}
                      control={
                        <Radio
                          value={JSON.stringify(pollAnswer.id)}
                          checked={value === JSON.stringify(pollAnswer.id)}
                          onChange={handleChange}
                        />
                      }
                      label={pollAnswer.text}
                    />
                  ))}
              </RadioGroup>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                className={classes.pollSubmit}
              >
                Vote
              </Button>
            </FormControl>
          </form>
        </Paper>
      ) : (
        <>
          {data?.getChannelPoll[0] && (
            <Paper className={classes.pollCard}>
              <Box width="100%" mb={3}>
                <Typography variant="caption">
                  Voting results! Total votes: {totalVotes()}
                </Typography>
                {data?.getChannelPoll.map((channelPoll) => (
                  <Typography variant="h2" key={channelPoll.id}>
                    {channelPoll?.poll_question?.text}
                  </Typography>
                ))}
              </Box>

              {data?.getChannelPoll[0]?.poll_question?.poll_anwers
                .sort((a, b) => (a.id > b.id ? 1 : -1))
                .map((pollVotes) => {
                  return (
                    <Box
                      key={pollVotes.id}
                      width="100%"
                      display="flex"
                      alignItems="flex-start"
                      flexDirection="column"
                    >
                      <Typography variant="body2">{pollVotes.text}</Typography>
                      <LinearProgressWithLabel
                        value={(100 * pollVotes.votes) / totalVotes()}
                      />
                    </Box>
                  );
                })}
            </Paper>
          )}
        </>
      )}
    </>
  );
};

export default PublishChannelPolling;
