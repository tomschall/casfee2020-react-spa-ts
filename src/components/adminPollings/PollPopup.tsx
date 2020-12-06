import React from 'react';
import { Box, Popover } from '@material-ui/core';
import { useWatchChannelHasActivePollSubscription } from '../../api/generated/graphql';
import PopupState, { bindPopover } from 'material-ui-popup-state';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
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
}));

interface PollPopUpProps {
  channelId: number;
}

const PollPopUp: React.FC<PollPopUpProps> = ({ channelId }) => {
  const classes = useStyles();
  const { data, loading } = useWatchChannelHasActivePollSubscription({
    variables: {
      currentChannelId: channelId, //currentChannel.id,
    },
  });
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'demoPopper',
  });
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
                  p={2}
                  style={{ minWidth: '30vw' }}
                >
                  <PublishChannelPolling
                    user={[]}
                    channelId={channelId}
                    currentChannel={0}
                    selectedPollAnswerId={0}
                  />
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
