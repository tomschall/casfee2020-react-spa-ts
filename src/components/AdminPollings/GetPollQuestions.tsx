import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import routes from '../../routes/routes';

import { useForm, Controller } from 'react-hook-form';
import {
  Badge,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import HelpIcon from '@material-ui/icons/Help';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import { useWatchGetPollQuestionsSubscription } from '../../api/generated/graphql';
import Loader from '../../layout/shared/Loader';
import NotFound from '../../layout/shared/NotFound';
import useStyles from './styles';

const GetPollQuestions: React.FC = () => {
  const classes = useStyles();
  const { data, loading, error } = useWatchGetPollQuestionsSubscription({
    variables: {},
  });

  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
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
          <ListItem key={question.id} component="li" onClick={handleClick}>
            <ListItemIcon>
              <HowToVoteIcon />
            </ListItemIcon>
            <ListItemText>
              <Link to={'/dashboard/pollings/' + question.id}>
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
