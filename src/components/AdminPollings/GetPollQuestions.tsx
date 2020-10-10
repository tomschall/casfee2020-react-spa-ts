import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import HelpIcon from '@material-ui/icons/Help';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { useGetPollQuestionsQuery } from '../../api/generated/graphql';
import Loader from '../../layout/shared/Loader';
import NotFound from '../../layout/shared/NotFound';
import useStyles from './styles';

const GetPollQuestions: React.FC = () => {
  const classes = useStyles();
  const { data, loading, error } = useGetPollQuestionsQuery({
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
        {data?.questions.map((question) => (
          <List className={classes.root}>
            <ListItem button onClick={handleClick}>
              <ListItemIcon>
                <HowToVoteIcon />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="h6">{question.text}</Typography>
              </ListItemText>
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div">
                <ListItem key={question.id} button>
                  <ListItemIcon>
                    <HelpIcon color="secondary" />
                  </ListItemIcon>
                  <ListItemText primary="Das Huhn" />
                </ListItem>
                <ListItem key={question.id} button>
                  <ListItemIcon>
                    <HelpIcon color="secondary" />
                  </ListItemIcon>
                  <ListItemText primary="Das Ei" />
                </ListItem>
              </List>
            </Collapse>
          </List>
        ))}
    </>
  );
};

export default GetPollQuestions;
