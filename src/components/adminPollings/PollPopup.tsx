import React from 'react';
import { Box, Button, Popover } from '@material-ui/core';
import { useWatchChannelHasActivePollSubscription } from '../../api/generated/graphql';
import PopupState, { bindPopover } from 'material-ui-popup-state';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import Loader from '../shared/Loader';
import PublishChannelPolling from '../adminPollings/PublishChannelPolling';
import { makeStyles } from '@material-ui/core/styles';
import {
  usePopupState,
  bindTrigger,
  bindMenu,
} from 'material-ui-popup-state/hooks';

const useStyles = makeStyles((theme) => ({
  popoverRoot: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupWidth: {
    minWidth: '40vw',
    [theme.breakpoints.down('sm')]: {
      minWidth: '90vw',
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
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'demoPopper',
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
              <HowToVoteIcon color="secondary" {...bindTrigger(popupState)} />
              <Popover
                anchorReference={'none'} // set popup center window
                anchorEl={'popper'}
                classes={{
                  root: classes.popoverRoot,
                }}
                {...bindPopover(popupState)}
              >
                <Box
                  display="flex"
                  justifyContent="center"
                  flexDirection="column"
                  p={2}
                  className={classes.popupWidth}
                >
                  <PublishChannelPolling
                    user={[]}
                    channelId={channelId}
                    currentChannel={0}
                    selectedPollAnswerId={0}
                  />
                  <Button
                    aria-label="close"
                    onClick={popupState.close}
                    style={{ marginLeft: '16px', maxWidth: '10vw' }}
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
