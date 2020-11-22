import React from 'react';
import { useRecoilState } from 'recoil';
import { useAuth0 } from '@auth0/auth0-react';
import { currentChannelState } from '../../atom.js';
import ResultGraph from './ResultGraph';
import Loader from '../shared/Loader';
import {
  Box,
  Button,
  Chip,
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
  user: [];
  channelId: number;
  pollAnswerId?: number;
  selectedPollAnswerId: number;
  currentChannel: number;
}

const PublishChannelPolling: React.FC<PublishChannelProps> = ({
  channelId,
  pollAnswerId,
}) => {
  const classes = useStyles();
  const { user } = useAuth0();
  const [currentChannel, setCurrentChannelState] = useRecoilState(
    currentChannelState,
  );
  const [selectedPollAnswerId, setSelectedPollAnswerId] = React.useState<
    number
  >(0);
  const { data } = useWatchChannelPollQuestionSubscription({
    variables: {
      channelId: currentChannel.id,
    },
  });
  const getPollAnswerVotes = useWatchPollAnswerVotesSubscription({
    variables: {
      pollAnswerId: selectedPollAnswerId,
    },
  });
  const [setPollAnswerVoteMutation] = useSetPollAnswerVoteMutation();
  const totalVotes = () => {
    let numbers: Array<any> = data?.getChannelPoll[0]?.poll_question
      ?.poll_anwers!;
    const count: any = [];
    numbers.map((num: any) => count.push(num.votes));
    const result = count.reduce((a: number, b: number) => a + b);
    return result;
  };
  const { data: userVote } = useWatchCheckUserHasVotedSubscription({
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

    let currentPollAnswerVotes = await getPollAnswerVotes.data
      ?.pollAnswerVotes[0].votes;

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

  return (
    <>
      {userVote?.user_votes[0]?.poll_question_id !==
      data?.getChannelPoll[0]?.poll_question?.id ? (
        <Paper className={classes.pollCard}>
          <Typography variant="caption">Anonymous poll</Typography>
          <Typography variant="h2">
            {data?.getChannelPoll[0].poll_question?.text}
          </Typography>

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
              <Box mb={3}>
                {data?.getChannelPoll.map((channelPoll) => (
                  <Typography
                    key={channelPoll.id}
                    color="secondary"
                    variant="h2"
                  >
                    {channelPoll?.poll_question?.text}
                  </Typography>
                ))}
              </Box>

              {data?.getChannelPoll[0]?.poll_question?.poll_anwers
                .sort((a, b) => (a.id > b.id ? 1 : -1))
                .map((pollVotes) => (
                  <ResultGraph
                    answerId={pollVotes.id}
                    pollVotes={pollVotes.votes}
                    text={pollVotes.text}
                    currentChannel={currentChannel}
                    totalVotes={totalVotes()}
                  />
                ))}
              <Chip
                color="primary"
                variant="outlined"
                size="small"
                label={`Total votes: ${totalVotes()}`}
              />
            </Paper>
          )}
        </>
      )}
    </>
  );
};

export default PublishChannelPolling;
