import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  pollSubmit: {
    marginTop: theme.spacing(3),
  },
}));

interface VoteButtonProps {
  enabled: boolean;
}

const VoteButton: React.FC<VoteButtonProps> = ({ enabled }) => {
  const classes = useStyles();
  return (
    <>
      <Button
        type="submit"
        variant="contained"
        color="secondary"
        className={classes.pollSubmit}
        disabled={enabled}
        aria-label="submit vote"
      >
        {enabled ? 'Choose Your Answer' : 'Vote'}
      </Button>
    </>
  );
};

export default VoteButton;
