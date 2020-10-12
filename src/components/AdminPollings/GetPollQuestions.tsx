import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import Loader from '../../layout/shared/Loader';
import NotFound from '../../layout/shared/NotFound';
import useStyles from './styles';

import { useWatchGetPollQuestionsSubscription } from '../../api/generated/graphql';
import { getPollQuestionAnswers } from '../../atom';

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

  const handleClick = (questionId: number) => {
    setPollQuestion(questionId);
  };

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
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default GetPollQuestions;
