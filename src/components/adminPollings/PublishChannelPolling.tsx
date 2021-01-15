import React from 'react';
import { useRecoilState } from 'recoil';
import { useAuth0 } from '@auth0/auth0-react';
import { currentChannelState } from '../../atom.js';
import ResultGraph from './ResultGraph';
import VoteButton from './VoteButton';
import ShowTotalVotes from './ShowTotalVotes';
import Loader from '../shared/Loader';
import {
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Paper,
  Typography,
} from '@material-ui/core';
import {
  useWatchChannelPollQuestionSubscription,
  useWatchPollAnswerVotesSubscription,
  useWatchCheckUserHasVotedSubscription,
  useSetPollAnswerVoteMutation,
  useSetUserVotePollQuestionMutation,
  Poll_Anwers,
} from '../../api/generated/graphql';
import { makeStyles } from '@material-ui/core/styles';
import { Channel } from '../../interfaces/channel.interface';

const useStyles = makeStyles((theme) => ({
  pollCard: {
    width: '100%',
    padding: theme.spacing(5),
    [theme.breakpoints.down('md')]: {
      transform: 'scale(50%)',
      padding: theme.spacing(2),
      minWidth: '100%',
    },
  },
  text: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '.875rem',
    },
  },
}));

const PublishChannelPolling: React.FC = () => {
  const classes = useStyles();
  const { user } = useAuth0();
  const [currentChannel] = useRecoilState<Channel>(currentChannelState);
  const [selectedPollAnswerId, setSelectedPollAnswerId] = React.useState<
    number | null
  >(null);

  const { data: getPollAnswerVotes } = useWatchPollAnswerVotesSubscription({
    variables: {
      pollAnswerId: selectedPollAnswerId ?? 0,
    },
  });

  const { data, loading, error } = useWatchChannelPollQuestionSubscription({
    variables: {
      channelId: currentChannel?.id,
    },
  });

  const [setPollAnswerVoteMutation] = useSetPollAnswerVoteMutation();

  const totalVotes = () => {
    let numbers: Array<Pick<Poll_Anwers, 'text' | 'id' | 'votes'>> = data
      ?.getChannelPoll[0]?.poll_question?.poll_anwers!;
    const count: number[] = [];
    if (numbers !== undefined) {
      numbers.map((num: Pick<Poll_Anwers, 'text' | 'id' | 'votes'>) =>
        count.push(num.votes),
      );
      const result = count.reduce((a: number, b: number) => a + b);
      return result;
    }
    return 0;
  };

  const {
    data: userVote,
    loading: userVoteLoading,
  } = useWatchCheckUserHasVotedSubscription({
    variables: {
      pollQuestionId: data?.getChannelPoll[0]?.poll_question?.id,
      auth0UserId: user.sub,
    },
  });

  const [setUserVotePollQuestionMutation] = useSetUserVotePollQuestionMutation({
    variables: {
      userName: user.username,
      auth0UserId: user.sub,
      pollQuestionId: data?.getChannelPoll[0]?.poll_question?.id,
      pollAnswerId: selectedPollAnswerId,
    },
  });

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPollAnswerId(parseInt(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedPollAnswerId === null) return;

    let currentPollAnswerVotes = getPollAnswerVotes?.pollAnswerVotes[0].votes;

    if (currentPollAnswerVotes !== undefined) {
      currentPollAnswerVotes++;
    }

    if (currentPollAnswerVotes === undefined) return;
    await setPollAnswerVoteMutation({
      variables: {
        pollAnswerId: selectedPollAnswerId,
        newVote: currentPollAnswerVotes,
      },
    });

    await setUserVotePollQuestionMutation({
      variables: {
        userName: user.nickname,
        auth0UserId: user.sub,
        pollQuestionId: data?.getChannelPoll[0]?.poll_question?.id,
        pollAnswerId: selectedPollAnswerId,
      },
    });
  };

  if (loading || error || userVoteLoading) {
    return <Loader />;
  }

  return (
    <>
      {userVote?.user_votes?.length ? (
        <Paper className={classes.pollCard}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexDirection="row"
            mb={3}
          >
            <Box>
              <Typography variant="caption">Anonymous poll</Typography>
              {data?.getChannelPoll.map((channelPoll) => (
                <Typography
                  key={channelPoll.id}
                  color="secondary"
                  variant="h2"
                  style={{ marginTop: 0 }}
                >
                  {channelPoll?.poll_question?.text}
                </Typography>
              ))}
            </Box>
            <ShowTotalVotes totalVotes={totalVotes()} />
          </Box>

          {data?.getChannelPoll[0]?.poll_question?.poll_anwers
            .sort((a, b) => (a.id > b.id ? 1 : -1))
            .map((pollVotes) => (
              <ResultGraph
                key={pollVotes.id}
                answerId={pollVotes.id}
                userVote={userVote?.user_votes[0]?.poll_answer_id}
                pollVotes={pollVotes.votes}
                text={pollVotes.text}
                totalVotes={totalVotes()}
              />
            ))}
        </Paper>
      ) : (
        <Paper className={classes.pollCard}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="flex-end"
            flexDirection="row"
            mb={3}
          >
            <Box>
              <Typography variant="caption">Anonymous poll</Typography>
              <Typography variant="h2" style={{ marginTop: 0 }}>
                {data?.getChannelPoll[0]
                  ? data?.getChannelPoll[0].poll_question?.text
                  : 'no value'}
              </Typography>
            </Box>
            <ShowTotalVotes totalVotes={totalVotes()} />
          </Box>

          <form onSubmit={handleSubmit}>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="poll"
                name="poll"
                value={selectedPollAnswerId}
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
                          value={pollAnswer.id}
                          checked={selectedPollAnswerId === pollAnswer.id}
                          onChange={handleChange}
                        />
                      }
                      label={
                        <Typography variant="body2" className={classes.text}>
                          {pollAnswer.text}
                        </Typography>
                      }
                    />
                  ))}
              </RadioGroup>
              <VoteButton enabled={false} />
            </FormControl>
          </form>
        </Paper>
      )}
    </>
  );
};

export default PublishChannelPolling;
