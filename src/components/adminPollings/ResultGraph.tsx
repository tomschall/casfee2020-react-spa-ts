import React from 'react';
import { Box, Chip, LinearProgress, Typography } from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';
import GroupIcon from '@material-ui/icons/Group';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  text: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '.875rem',
    },
  },
}));

interface ResultGraphProps {
  answerId: number;
  userVote: number | undefined;
  pollVotes: number;
  text: string;
  totalVotes: any;
}

const ResultGraph: React.FC<ResultGraphProps> = ({
  answerId,
  userVote,
  pollVotes,
  text,
  totalVotes,
}) => {
  const classes = useStyles();
  const LinearProgressWithLabel = (props: any) => {
    return (
      <Box
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="row"
      >
        <Box width="100%" mr={1}>
          <LinearProgress
            id={answerId}
            color={userVote === answerId ? 'secondary' : 'primary'}
            variant="determinate"
            {...props}
          />
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="row-reverse"
        >
          <Chip
            size="small"
            color={userVote === answerId ? 'secondary' : 'primary'}
            variant={userVote === answerId ? 'default' : 'outlined'}
            label={`${pollVotes} / ${props.value.toFixed(1)}%`}
            icon={userVote === answerId ? <FaceIcon /> : <GroupIcon />}
          />
        </Box>
      </Box>
    );
  };

  return (
    <Box
      key={answerId}
      width="100%"
      display="flex"
      alignItems="flex-start"
      flexDirection="column"
      mb={2}
    >
      <Typography variant="body1" className={classes.text}>
        {text}
      </Typography>
      <LinearProgressWithLabel
        value={(100 * pollVotes) / totalVotes}
        answerid={answerId}
      />
    </Box>
  );
};

export default ResultGraph;
