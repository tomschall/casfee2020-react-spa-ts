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
  root: {},
  play: {
    color: theme.palette.error.main,
  },
  stop: {
    color: theme.palette.success.main,
  },

  details: {
    alignItems: 'flex-start',
  },
  column: {
    // flexBasis: '100%',
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

  const handleClick = (questionId: number) => {
    setPollQuestion(questionId);
  };

  useEffect(() => {}, [data]);

  if (loading) {
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
                  component={Link}
                  onClick={() => {
                    handleClick(question.id);
                  }}
                  to={{
                    pathname:
                      '/dashboard/pollings/edit/question/' + question.id,
                    state: { fromDashboard: true },
                  }}
                >
                  {question.text}
                </Typography>

                {/* <Box
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="center"
                    className={classes.column}
                  >
                    <ShowPollQuestionLockState
                      setActiveState={question.is_active}
                    />
                    <Chip
                      variant="outlined"
                      color="primary"
                      size="small"
                      label={`Created at | ${moment(question.created_at).format(
                        'DD-MM-YYYY | hh:mm:ss',
                      )}`}
                    />
                  </Box> */}
              </AccordionSummary>
              <AccordionDetails className={classes.details}>
                <div
                  className={clsx(classes.column)}
                  onMouseEnter={() => {
                    handleClick(question.id);
                  }}
                >
                  <Typography variant="caption">
                    Where you want to publish this poll? Orange colored channels
                    has an active poll.
                  </Typography>
                  <GetChannels questionId={question.id} />
                </div>
              </AccordionDetails>
              <AccordionActions>
                <Button
                  variant="contained"
                  color="secondary"
                  href={`/dashboard/pollings/edit/question/${question.id}`}
                  aria-label="Poll Question"
                  size="small"
                >
                  Edit
                </Button>

                <DeleteQuestion
                  questionId={question.id}
                  setActiveState={question.is_active}
                />
              </AccordionActions>
            </Accordion>
          ))
      )}
    </>
  );
};

export default GetPollQuestions;
