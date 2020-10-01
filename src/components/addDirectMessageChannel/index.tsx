import React, { useState } from 'react';
import {
  Button,
  Menu,
  MenuItem,
  styled,
  CircularProgress,
} from '@material-ui/core';
import {
  useValidateAndAddDirectMessageChannelMutation,
  useWatchUsersWhoHaveSubscribedToDirectMessageChannelSubscription,
} from '../../api/generated/graphql';
import { Alert } from '@material-ui/lab';
import { v4 as uuidv4 } from 'uuid';
import { useAuth0 } from '@auth0/auth0-react';
import { useHistory } from 'react-router';

const SidebarMenuButton = styled(Button)({
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  margin: '20px 0 0 0',
  padding: '0 30px',
});

const SidebarMenu = styled(Menu)({});

const AddDirectMessageChannel: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { isAuthenticated, user, isLoading } = useAuth0();

  const user_id = user.sub;

  let history = useHistory();

  const {
    data: users,
    loading,
    error,
  } = useWatchUsersWhoHaveSubscribedToDirectMessageChannelSubscription({
    variables: {
      user_id,
    },
  });

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

  const handleAddUser = async (user_id: string, dm_user: string) => {
    setAnchorEl(null);
    const { data } = await validateAndAddDirectMessageChannelMutation({
      variables: {
        name: uuidv4(),
        user_id1: user_id,
        user_id2: dm_user,
      },
    });

    console.log('data', data);

    history.push(`/channel/general`);

    // TODO: add backend_only flag for addDirectMessageChannel mutation to hasura
  };

  const handleClick = () => {
    history.push(`/channel/general`);
  };

  return (
    <React.Fragment>
      <button type="button" onClick={handleClick}>
        back to general channel...
      </button>
      {users
        ? users.user.map((dm_user: any) => {
            return dm_user.user_channels.length === 0 ? (
              <MenuItem
                onClick={() => handleAddUser(user_id, dm_user?.auth0_user_id)}
              >
                {dm_user.username}
              </MenuItem>
            ) : (
              false
            );
          })
        : ''}
    </React.Fragment>
  );
};

export default AddDirectMessageChannel;
