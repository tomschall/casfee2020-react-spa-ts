import React, { useEffect } from 'react';
import moment from 'moment';
import { theme } from '../../theme/theme';
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
  Typography,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import NotFound from '../shared/NotFound';
import {
  useWatchGetPollQuestionsSubscription,
  useWatchGetChannelsSubscription,
} from '../../api/generated/graphql';
import { getPollQuestionAnswers } from '../../atom';
import DeleteQuestion from './DeleteQuestion';
import GetChannels from './GetChannels';
import Loader from '../shared/Loader';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {},
  play: {
    color: theme.palette.error.main,
  },
  stop: {
    color: theme.palette.success.main,
  },
  text: {
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
      lineHeight: '15px',
    },
  },
  details: {
    alignItems: 'flex-start',
  },
  voteIcon: {
    marginRight: theme.spacing(1),
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

  const {
    data: getChannel,
    loading: loadingGetChannel,
  } = useWatchGetChannelsSubscription();

  const handleClick = (questionId: number) => {
    setPollQuestion(questionId);
  };

  if (loading || loadingGetChannel) {
    return <Loader />;
  }

  if (error) {
    return <NotFound />;
  }

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        style={{ marginRight: theme.spacing(2) }}
      >
        <Typography variant="h3" style={{ padding: theme.spacing(2) }}>
          Poll list overview:
        </Typography>
        <Chip
          variant="outlined"
          size="small"
          color="secondary"
          label={'Total polls: ' + data?.questions.length}
        />
      </Box>
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
                {question?.channel_polls.length > 0 ? (
                  <HowToVoteIcon
                    color="secondary"
                    className={classes.voteIcon}
                  />
                ) : (
                  <HowToVoteIcon className={classes.voteIcon} />
                )}
                <Typography
                  color={
                    question?.channel_polls.length > 0 ? 'secondary' : 'primary'
                  }
                  component={Link}
                  onClick={() => {
                    handleClick(question.id);
                  }}
                  to={{
                    pathname:
                      '/dashboard/pollings/edit/question/' + question.id,
                    state: { fromDashboard: true },
                  }}
                  className={classes.text}
                >
                  {question.text}
                </Typography>
              </AccordionSummary>
              <AccordionDetails className={classes.details}>
                <div
                  onMouseEnter={() => {
                    handleClick(question.id);
                  }}
                >
                  <>
                    <Typography variant="caption">
                      Where you want to publish this poll? Orange colored
                      channels has an active poll.
                    </Typography>
                    <GetChannels
                      questionId={question.id}
                      questionLocked={question.is_active}
                    />
                  </>
                </div>
              </AccordionDetails>
              <AccordionActions>
                <Button
                  variant="contained"
                  color="secondary"
                  component={Link}
                  to={`/dashboard/pollings/edit/question/${question.id}`}
                  aria-label="Poll Question"
                  size="small"
                >
                  Edit
                </Button>

                <DeleteQuestion
                  questionId={question.id}
                  setActiveState={question.is_active ? true : false}
                />
              </AccordionActions>
            </Accordion>
          ))
      )}
    </>
  );
};

export default GetPollQuestions;
