import React from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import {
  Box,
  Button,
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
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flex: 1,
  },
  pollChannels: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
}));

interface Props {
  question_text?: string;
  question_id?: number;
}

const GetPollQuestions: React.FC<Props> = () => {
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
                <ListItemText>
                  <Link
                    to={{
                      pathname:
                        '/dashboard/pollings/edit/question/' + question.id,
                      state: { fromDashboard: true },
                    }}
                  >
                    <Typography variant="body2">
                      {question.id} - {question.text}
                    </Typography>
                  </Link>
                </ListItemText>
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
                  <Button
                    className={classes.delete}
                    value={question.id}
                    onClick={() => {
                      handleQuestionDelete(question.id);
                    }}
                  >
                    Delete
                  </Button>
                )}
              </Box>
              <Box className={classes.pollChannels}>
                <Box>
                  {question?.channel_polls.map((chn) => (
                    <Chip
                      variant="outlined"
                      size="small"
                      color="secondary"
                      label={chn.channel.name}
                    />
                  ))}
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
