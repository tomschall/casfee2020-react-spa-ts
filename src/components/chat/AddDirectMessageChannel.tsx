import React, { useState } from 'react';
import { MenuItem, CircularProgress } from '@material-ui/core';
import {
  useValidateAndAddDirectMessageChannelMutation,
  useWatchUsersWhoHaveSubscribedToDirectMessageChannelSubscription,
  useUpsertMessageCursorMutation,
  useInsertMessageMutation,
} from '../../api/generated/graphql';
import { Alert } from '@material-ui/lab';
import { v4 as uuidv4 } from 'uuid';
import { useAuth0 } from '@auth0/auth0-react';
import { useHistory } from 'react-router';

const AddDirectMessageChannel: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { user } = useAuth0();

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
    upsertMessageCursorMutation,
    { error: upsertMessageError },
  ] = useUpsertMessageCursorMutation();

  const [
    sendMessage,
    { error: sendUpdateMessageError },
  ] = useInsertMessageMutation();

  const [
    validateAndAddDirectMessageChannelMutation,
    { error: addDMError },
  ] = useValidateAndAddDirectMessageChannelMutation();

  if (error || addDMError || upsertMessageError || sendUpdateMessageError) {
    console.log('error', addDMError);
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

    await sendMessage({
      variables: {
        message: {
          user_id: 'admin',
          text: `Welcome to your new direct message channel`,
          channel_id: data?.validateAndAddDirectMessageChannel?.id,
        },
      },
    });

    if (
      data?.validateAndAddDirectMessageChannel?.id &&
      data?.validateAndAddDirectMessageChannel?.id > 0
    )
      upsertMessageCursorMutation({
        variables: {
          channel_id: data?.validateAndAddDirectMessageChannel?.id,
          message_id: 1,
          user_id: dm_user,
        },
      });

    history.push(`/channel/${data?.validateAndAddDirectMessageChannel?.name}`);

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
        users.user.map((dm_user: any, index) => {
          return dm_user.user_channels.length === 0 ? (
            <MenuItem
              key={index}
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
