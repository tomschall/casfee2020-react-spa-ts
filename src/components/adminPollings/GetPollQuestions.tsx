import React from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import {
  Box,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Loader from '../shared/Loader';
import NotFound from '../shared/NotFound';
import {
  useWatchGetPollQuestionsSubscription,
  useDeletePollQuestionMutation,
} from '../../api/generated/graphql';
import { getPollQuestionAnswers } from '../../atom';
import GetChannels from './GetChannels';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {},
  play: {
    color: theme.palette.error.main,
  },
  stop: {
    color: theme.palette.success.main,
  },
  delete: {
    width: 'auto',
  },
  pollList: {
    width: '100%',
    padding: theme.spacing(4),
    backgroundColor: '#101652',
  },
  pollListTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    // flex: 1,
  },
  pollChannels: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
}));

const GetPollQuestions: React.FC = () => {
  const classes = useStyles();
  const { data, loading, error } = useWatchGetPollQuestionsSubscription({
    variables: {},
  });
  const [pollQuestion, setPollQuestion] = useRecoilState<any>(
    getPollQuestionAnswers,
  );
  const [
    deleteQuestion,
    { error: deleteError },
  ] = useDeletePollQuestionMutation({
    variables: {
      pollQuestionId: pollQuestion,
    },
  });

  // HANDLE SET POLL QUESTION ID
  const handleClick = (questionId: number) => {
    setPollQuestion(questionId);
  };
  const handleQuestionDelete = async (questionId: number) => {
    if (!questionId) return;

    await deleteQuestion({
      variables: {
        pollQuestionId: questionId,
      },
    });
  };

  if (loading) {
    return <Loader />;
  }

  if (error || deleteError) {
    return <NotFound />;
  }

  return (
    <>
      <Typography variant="h3">Poll list overview</Typography>
      <List className={classes.root}>
        {data?.questions.map((question) => (
          <ListItem
            key={question.id}
            component="li"
            onClick={() => {
              handleClick(question.id);
            }}
          >
            <Box className={classes.pollList}>
              <Box className={classes.pollListTitle}>
                <ListItemIcon>
                  {question.is_active ? (
                    <HowToVoteIcon color="secondary" />
                  ) : (
                    <HowToVoteIcon />
                  )}
                </ListItemIcon>
                <Chip
                  variant="outlined"
                  size="small"
                  color="primary"
                  label={question.id}
                />

                <Box flex={20}>
                  <ListItemText>
                    <Link
                      to={{
                        pathname:
                          '/dashboard/pollings/edit/question/' + question.id,
                        state: { fromDashboard: true },
                      }}
                    >
                      <Typography style={{ marginLeft: 16 }} variant="h3">
                        {question.text}
                      </Typography>
                    </Link>
                  </ListItemText>
                </Box>

                {question.is_active ? (
                  <ListItemIcon>
                    <LockIcon className={classes.play} />
                  </ListItemIcon>
                ) : (
                  <ListItemIcon>
                    <LockOpenIcon className={classes.stop} />
                  </ListItemIcon>
                )}
                {!question.is_active && (
                  <>
                    <Chip
                      variant="outlined"
                      size="small"
                      color="primary"
                      onClick={() => {
                        handleQuestionDelete(question.id);
                      }}
                      label="Delete"
                    />
                  </>
                )}
              </Box>
              <Box className={classes.pollChannels}>
                <Box>
                  {loading ? (
                    <>
                      <Loader />
                    </>
                  ) : (
                    <>
                      {question?.channel_polls.map((chn, index) => (
                        <Chip
                          key={index}
                          style={{ marginTop: 8, marginRight: 8 }}
                          variant="outlined"
                          size="small"
                          color="secondary"
                          label={chn.channel.name}
                        />
                      ))}
                    </>
                  )}
                </Box>
                <GetChannels />
              </Box>
            </Box>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default GetPollQuestions;
