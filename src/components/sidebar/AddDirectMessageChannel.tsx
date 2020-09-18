import React, { useState, useCallback } from 'react';
import AddChannelModal from './AddChannelModal';
import { useRecoilState } from 'recoil';
import { channelModalOpenState } from '../../atom.js';
import {
  Button,
  Menu,
  MenuItem,
  styled,
  CircularProgress,
} from '@material-ui/core';
import {
  useWatchUsersSubscription,
  useGetCheckIfUserHasSubscribedToChannelQuery,
  useAddDirectMessageChannelMutation,
  WatchUsersSubscriptionHookResult,
} from '../../api/generated/graphql';
import { Channel_Type_Enum } from '../../api/generated/graphql';
import { Alert } from '@material-ui/lab';

const SidebarMenuButton = styled(Button)({
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  margin: '20px 0 0 0',
  padding: '0 30px',
});

const SidebarMenu = styled(Menu)({});

interface AddDirectMessageChannelProps {
  user_id: string;
}

const AddDirectMessageChannel: React.FC<AddDirectMessageChannelProps> = ({
  user_id,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [channelModalOpen, setChannelModalOpen] = useRecoilState<any>(
    channelModalOpenState,
  );

  const { data: users, loading, error } = useWatchUsersSubscription({
    variables: {},
  });

  const [
    addDirectMessageChannelMutation,
    { data: addDMData, loading: addDMLoading, error: addDMError },
  ] = useAddDirectMessageChannelMutation();

  if (error) {
    return <Alert severity="error">Fetching users error...</Alert>;
  }

  if (loading) {
    return <CircularProgress />;
  }

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpen = async (user_id: string, dm_user: string) => {
    setAnchorEl(null);
    const { data } = await addDirectMessageChannelMutation({
      variables: {
        name: 'dmyyy',
        user_id1: user_id,
        user_id2: dm_user,
      },
    });

    // TODO: Check with action that only 2 users can be addes in one dm_channel
    // and that 2 users can only have one dm_channel...
    // generate random channel string on each channel creation
  };

  return (
    <React.Fragment>
      <SidebarMenuButton
        color="primary"
        variant="contained"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        Direct Messages
      </SidebarMenuButton>
      <SidebarMenu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {users
          ? users.user.map((dm_user: any) => (
              <MenuItem
                onClick={() => handleOpen(user_id, dm_user?.auth0_user_id)}
              >
                {dm_user.username}
              </MenuItem>
            ))
          : ''}
      </SidebarMenu>
    </React.Fragment>
  );
};

export default AddDirectMessageChannel;
