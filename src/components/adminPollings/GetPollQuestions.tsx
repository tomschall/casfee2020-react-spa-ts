import React, { useEffect } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  Divider,
  Typography,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import NotFound from '../shared/NotFound';
import { useWatchGetPollQuestionsSubscription } from '../../api/generated/graphql';
import { getPollQuestionAnswers } from '../../atom';
import DeleteQuestion from './DeleteQuestion';
import ShowPollQuestionLockState from './ShowPollQuestionLockState';
import GetChannels from './GetChannels';
import Loader from '../shared/Loader';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  play: {
    color: theme.palette.error.main,
  },
  stop: {
    color: theme.palette.success.main,
  },

  heading: {
    fontSize: theme.typography.pxToRem(15),
  },

  details: {
    alignItems: 'flex-start',
  },
  column: {
    flexBasis: '100%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
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

  const handleClick = (questionId: number) => {
    setPollQuestion(questionId);
  };

  useEffect(() => {}, [pollQuestion, data]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <NotFound />;
  }

  return (
    <>
      <div className={classes.root}>
        <Typography variant="h3">Poll list overview: </Typography>
        {data?.questions.length === 0 ? (
          <Alert severity="info">Please add a new question.</Alert>
        ) : (
          data?.questions
            .sort((a, b) => a.id + b.id)
            .map((question) => (
              <Accordion key={question.id} defaultExpanded={false}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={question.text}
                  id={question.text}
                >
                  <Box
                    display="flex"
                    justifyContent="flex-start"
                    alignItems="center"
                    className={classes.column}
                  >
                    <Chip
                      variant="outlined"
                      size="small"
                      color="primary"
                      label={question.id}
                    />
                    {question.is_active ? (
                      <HowToVoteIcon color="secondary" />
                    ) : (
                      <HowToVoteIcon />
                    )}

                    <Link
                      onClick={() => {
                        handleClick(question.id);
                      }}
                      to={{
                        pathname:
                          '/dashboard/pollings/edit/question/' + question.id,
                        state: { fromDashboard: true },
                      }}
                    >
                      <Typography
                        style={{ marginLeft: 16 }}
                        className={classes.heading}
                      >
                        {question.text}
                      </Typography>
                    </Link>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="flex-start"
                    alignItems="center"
                    className={classes.column}
                  >
                    <ShowPollQuestionLockState
                      setActiveState={question.is_active}
                    />
                  </Box>
                </AccordionSummary>
                <AccordionDetails className={classes.details}>
                  <div className={classes.column}>
                    <Typography
                      variant="caption"
                      style={{ display: 'flex', width: '100%' }}
                    >
                      This poll is published on:
                    </Typography>
                    {question?.channel_polls.map((chn, index) => (
                      <Chip
                        key={chn.channel.name + index}
                        style={{ marginTop: 8, marginRight: 8 }}
                        variant="outlined"
                        size="small"
                        color="secondary"
                        label={chn.channel.name}
                      />
                    ))}
                  </div>
                  <div
                    className={clsx(classes.column, classes.helper)}
                    onMouseEnter={() => {
                      handleClick(question.id);
                    }}
                  >
                    <Typography variant="caption">
                      Where you want to publish this poll? Orange colored
                      channels has an active poll.
                    </Typography>
                    <GetChannels />
                  </div>
                </AccordionDetails>
                <Divider />
                <AccordionActions>
                  <Link
                    onClick={() => {
                      handleClick(question.id);
                    }}
                    to={{
                      pathname:
                        '/dashboard/pollings/edit/question/' + question.id,
                      state: { fromDashboard: true },
                    }}
                  >
                    <Button variant="contained" color="secondary">
                      Edit
                    </Button>
                  </Link>
                  <DeleteQuestion
                    questionId={question.id}
                    setActiveState={question.is_active}
                  />
                </AccordionActions>
              </Accordion>
            ))
        )}
      </div>
    </>
  );
};

export default GetPollQuestions;
