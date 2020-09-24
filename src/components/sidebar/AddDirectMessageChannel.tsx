import React, { useState } from 'react';
import {
  Button,
  Menu,
  MenuItem,
  styled,
  CircularProgress,
} from '@material-ui/core';
import {
  useWatchUsersSubscription,
  useValidateAndAddDirectMessageChannelMutation,
} from '../../api/generated/graphql';
import { Alert } from '@material-ui/lab';
import { v4 as uuidv4 } from 'uuid';

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

  const { data: users, loading, error } = useWatchUsersSubscription();

  const [
    validateAndAddDirectMessageChannelMutation,
    { data: addDMData, loading: addDMLoading, error: addDMError },
  ] = useValidateAndAddDirectMessageChannelMutation();

  if (error || addDMError) {
    return <Alert severity="error">Fetching users error...</Alert>;
  }

  if (loading) {
    return <CircularProgress />;
  }

  const handleOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddUser = async (user_id: string, dm_user: string) => {
    setAnchorEl(null);
    const { data } = await validateAndAddDirectMessageChannelMutation({
      variables: {
        name: uuidv4(),
        user_id1: user_id,
        user_id2: dm_user,
      },
    });

    // TODO: add backend_only flag for addDirectMessageChannel mutation to hasura
  };

  return (
    <React.Fragment>
      <SidebarMenuButton
        color="primary"
        variant="contained"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleOpen}
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
                onClick={() => handleAddUser(user_id, dm_user?.auth0_user_id)}
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
