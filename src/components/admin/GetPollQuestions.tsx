import React from 'react';
import { theme } from '../../theme/theme';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Badge,
  Box,
  Button,
  ButtonGroup,
  Chip,
  Typography,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Edit from '@material-ui/icons/Edit';
import {
  useWatchGetPollQuestionsSubscription,
  useWatchGetChannelsSubscription,
} from '../../api/generated/graphql';
import { getPollQuestionAnswers } from '../../atom';
import DeleteQuestion from './DeleteQuestion';
import GetChannels from './GetChannels';
import Loader from '../shared/Loader';
import SetPollQuestionLockState from './SetPollQuestionLockState';
import { makeStyles } from '@material-ui/core/styles';
import { logToConsole } from '../../helpers/helpers';

const useStyles = makeStyles((theme) => ({
  badge: {
    backgroundColor: theme.palette.error.light,
    color: theme.palette.error.light,
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
  text: {
    marginLeft: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
      lineHeight: '15px',
    },
  },
  details: {
    alignItems: 'flex-start',
  },
  voteIcon: {
    color: 'grey',
  },
  voteIconPublished: {
    color: theme.palette.primary.main,
  },
}));

const GetPollQuestions: React.FC = () => {
  const classes = useStyles();
  const { data, loading, error } = useWatchGetPollQuestionsSubscription({
    variables: {},
  });
  const [, setPollQuestion] = useRecoilState<number>(getPollQuestionAnswers);

  const { loading: loadingGetChannel } = useWatchGetChannelsSubscription();

  const handleClick = (questionId: number) => {
    setPollQuestion(questionId);
  };

  if (loading || loadingGetChannel) {
    return <Loader />;
  }

  if (error) {
    logToConsole('GetPollQuestions Error', error);
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
          .sort((a, b) => b.id - a.id)
          .map((question, index) => (
            <Accordion key={index} defaultExpanded={false}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={question.text}
              >
                {question?.channel_polls.length > 0 ? (
                  <Badge
                    variant="dot"
                    badgeContent={question.id}
                    classes={{ badge: classes.badge }}
                  >
                    <HowToVoteIcon className={classes.voteIconPublished} />
                  </Badge>
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
                <ButtonGroup disableElevation variant="outlined">
                  <Button
                    color="secondary"
                    component={Link}
                    to={`/dashboard/pollings/edit/question/${question.id}`}
                    aria-label="Poll Question"
                    size="small"
                    startIcon={<Edit />}
                  >
                    Edit
                  </Button>
                  <SetPollQuestionLockState
                    pollQuestionId={question.id}
                    setActiveState={question.is_active}
                  />
                  <DeleteQuestion
                    questionId={question.id}
                    setActiveState={question.is_active}
                  />
                </ButtonGroup>
              </AccordionActions>
            </Accordion>
          ))
      )}
    </>
  );
};

export default GetPollQuestions;
