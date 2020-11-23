import React, { useEffect } from 'react';
import { Chip } from '@material-ui/core';

interface ShowTotalVotesProps {
  totalVotes: number;
}

const ShowTotalVotes: React.FC<ShowTotalVotesProps> = ({ totalVotes }) => {
  return (
    <>
      <Chip
        color="primary"
        variant="outlined"
        size="small"
        label={`Total votes: ${totalVotes}`}
      />
    </>
  );
};

export default ShowTotalVotes;
