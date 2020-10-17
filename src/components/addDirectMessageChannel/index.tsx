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
      <p id="simple-modal-description">
        {users && users.user.length > 0
          ? 'Select users that you wanna send direct messages to.'
          : 'At the moment there are no more users to select. You have to select them from the direct message sidebar.'}
      </p>
      {users &&
        users.user.map((dm_user: any) => {
          return dm_user.user_channels.length === 0 ? (
            <MenuItem
              onClick={() => handleAddUser(user_id, dm_user?.auth0_user_id)}
            >
              {dm_user?.username} ({dm_user?.auth0_user_id})
            </MenuItem>
          ) : (
            false
          );
        })}
    </React.Fragment>
  );
};

export default AddDirectMessageChannel;
