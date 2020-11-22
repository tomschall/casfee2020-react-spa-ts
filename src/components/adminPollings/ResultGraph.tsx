import React, { useEffect } from 'react';
import { Box, LinearProgress, Typography } from '@material-ui/core';

interface ResultGraphProps {
  answerId: number;
  pollVotes: number;
  text: string;
  currentChannel: number;
  totalVotes: any;
}

const ResultGraph: React.FC<ResultGraphProps> = ({
  answerId,
  pollVotes,
  text,
  currentChannel,
  totalVotes,
}) => {
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
            color={answerId === props.answerid ? 'secondary' : 'primary'}
            variant="determinate"
            {...props}
          />
        </Box>
        <Box minWidth={0}>
          <Typography variant="body2" color="textSecondary">
            {props.value.toFixed(1)}%
          </Typography>
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
      <Typography variant="body2">{text}</Typography>
      <LinearProgressWithLabel
        value={(100 * pollVotes) / totalVotes}
        answerid={answerId}
      />
    </Box>
  );
};

export default ResultGraph;
