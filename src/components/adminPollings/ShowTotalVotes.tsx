import React from 'react';
import { Badge } from '@material-ui/core';
import HowToVoteIcon from '@material-ui/icons/HowToVote';

interface ShowTotalVotesProps {
  totalVotes: number | null;
}

const ShowTotalVotes: React.FC<ShowTotalVotesProps> = ({ totalVotes }) => {
  return (
    <>
      {totalVotes && (
        <Badge color="secondary" badgeContent={totalVotes}>
          <HowToVoteIcon color="primary" />
        </Badge>
      )}
    </>
  );
};

export default ShowTotalVotes;
