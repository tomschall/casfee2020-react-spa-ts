import React from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import Loader from '../shared/Loader';
import NotFound from '../shared/NotFound';
import {
  useWatchGetPollQuestionsSubscription,
  useDeletePollQuestionMutation
} from '../../api/generated/graphql';
import { getPollQuestionAnswers } from '../../atom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {},
  play: {
    color: theme.palette.success.main,
  },
  stop: {
    color: theme.palette.error.main,
  },
  delete: {
    width: '150px'
  }
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

  const [deleteQuestion, { error: deleteError }] = useDeletePollQuestionMutation({
    variables: {
      pollQuestionId: pollQuestion
    }
  });

  const handleClick = (questionId: number) => {
    setPollQuestion(questionId);
  };

  const handleQuestionDelete = async (questionId: number) => {
    console.log('deleted', questionId);

    if (!questionId) return;

    try {
      await deleteQuestion({
        variables: {
          pollQuestionId: questionId
        }
      })

    } catch (error) {
      console.log('error on delete poll question');
    }
  }

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <NotFound />;
  }

  return (
    <>
      <Typography variant="h3">Poll list</Typography>
      <List className={classes.root}>
        {data?.questions.map((question) => (
          <ListItem
            key={question.id}
            component="li"
            onClick={() => {
              handleClick(question.id);
            }}
          >
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
                  pathname: '/dashboard/pollings/edit/question/' + question.id,
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
                <PlayArrowIcon className={classes.play} />
              </ListItemIcon>
            ) : (
                <ListItemIcon>
                  <StopIcon className={classes.stop} />
                </ListItemIcon>
              )}
            {!question.is_active ? (
              <Button
                className={classes.delete}
                value={question.id}
                onClick={() => {
                  handleQuestionDelete(question.id);
                }}
              >
                Delete
              </Button>
            ) : (
                <Button
                  className={classes.delete}
                  value={question.id}
                  disabled
                >
                  Active poll
                </Button>
              )}
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default GetPollQuestions;
