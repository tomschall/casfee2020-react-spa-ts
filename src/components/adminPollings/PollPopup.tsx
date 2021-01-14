import React from 'react';
import { Badge, Box, Button, Popover } from '@material-ui/core';
import { useWatchChannelHasActivePollSubscription } from '../../api/generated/graphql';
import PopupState, { bindPopover } from 'material-ui-popup-state';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import Loader from '../shared/Loader';
import PublishChannelPolling from '../adminPollings/PublishChannelPolling';
import { makeStyles } from '@material-ui/core/styles';
import { bindTrigger } from 'material-ui-popup-state/hooks';
import Logo from '../shared/Logo';

const useStyles = makeStyles((theme) => ({
  popoverRoot: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
  },
  popupWidth: {
    width: '30vw',
    padding: theme.spacing(1),
    [theme.breakpoints.down('lg')]: {
      width: '40vw',
    },
    [theme.breakpoints.down('md')]: {
      width: '50vw',
    },
    [theme.breakpoints.down('sm')]: {
      width: '85vw',
      margin: 0,
    },
    margin: theme.spacing(0),
    paddingBottom: theme.spacing(2),
  },
  voteIcon: {
    cursor: 'pointer',
  },
  badge: {
    backgroundColor: '#44b700',
    color: '#44b700',
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
}));

interface PollPopUpProps {
  channelId: number;
}

const PollPopUp: React.FC<PollPopUpProps> = ({ channelId }) => {
  const classes = useStyles();
  const { data, loading } = useWatchChannelHasActivePollSubscription({
    variables: {
      currentChannelId: channelId,
    },
  });

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      {data?.poll_questions?.length === 1 ? (
        <PopupState variant="popover" popupId="pollingPopOver">
          {(popupState) => (
            <>
              <Badge variant="dot" classes={{ badge: classes.badge }}>
                <HowToVoteIcon
                  color="primary"
                  {...bindTrigger(popupState)}
                  className={classes.voteIcon}
                />
              </Badge>
              <Popover
                anchorReference={'none'} // set popup center window
                classes={{
                  root: classes.popoverRoot,
                }}
                {...bindPopover(popupState)}
              >
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  flexDirection="column"
                  className={classes.popupWidth}
                >
                  <Logo />

                  <PublishChannelPolling />
                  <Button
                    aria-label="close poll popover"
                    onClick={popupState.close}
                    style={{ maxWidth: '10vw' }}
                  >
                    Close
                  </Button>
                </Box>
              </Popover>
            </>
          )}
        </PopupState>
      ) : (
        false
      )}
    </>
  );
};

export default PollPopUp;
