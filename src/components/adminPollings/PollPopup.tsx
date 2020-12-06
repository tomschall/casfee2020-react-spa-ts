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
    minWidth: '40vw',
    padding: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(3),
      minWidth: '90vw',
    },
  },
  badge: {
    backgroundColor: '#4CAF50',
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
                <HowToVoteIcon {...bindTrigger(popupState)} />
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

                  <PublishChannelPolling
                    user={[]}
                    channelId={channelId}
                    currentChannel={0}
                    selectedPollAnswerId={0}
                  />
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
        <HowToVoteIcon />
      )}
    </>
  );
};

export default PollPopUp;
