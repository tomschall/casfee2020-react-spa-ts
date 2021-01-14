import React from 'react';
import { Badge } from '@material-ui/core';
import HowToVoteIcon from '@material-ui/icons/HowToVote';

interface ShowTotalVotesProps {
  totalVotes: number;
}

const ShowTotalVotes: React.FC<ShowTotalVotesProps> = ({ totalVotes }) => {
  return (
    <>
      <Badge color="secondary" badgeContent={totalVotes}>
        <HowToVoteIcon color="primary" />
      </Badge>
    </>
  );
};

export default ShowTotalVotes;
