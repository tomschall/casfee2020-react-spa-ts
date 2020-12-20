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
  },
  popupWidth: {
    width: '40vw',
    minWidth: '40vw',
    maxWidth: '50vw',
    padding: theme.spacing(5),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(3),
      minWidth: '50vw',
      maxWidth: '60vw',
      width: '50vw',
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(3),
      minWidth: '90vw',
      width: '90vw',
    },
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
        <PopupState variant="popover" popupId="demoPopper">
          {(popupState) => (
            <>
              <Badge variant="dot" classes={{ badge: classes.badge }}>
                <HowToVoteIcon color="primary" {...bindTrigger(popupState)} />
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
                    aria-label="close"
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
