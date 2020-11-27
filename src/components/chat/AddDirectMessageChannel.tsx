import React, { useState } from 'react';
import {
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  Typography,
} from '@material-ui/core';
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
import Loader from '../shared/Loader';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: '#000000',
    color: '#F57C00',
  },
  spacer: {
    marginTop: theme.spacing(5),
  },
}));

const AddDirectMessageChannel: React.FC = () => {
  const classes = useStyles();
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
    return <Loader />;
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
    <>
      <Container maxWidth="sm">
        <Grid item xs={12}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="flex-start"
            flexDirection="column"
            mt={5}
            mb={5}
          >
            <Typography variant="h2">Send direct message</Typography>
            <Typography
              color="secondary"
              variant="caption"
              id="simple-modal-description"
            >
              {users && users.user.length > 0
                ? 'Select users that you wanna send direct messages to.'
                : 'At the moment there are no more users to select. You have to select them from the direct message sidebar.'}
            </Typography>
          </Box>
          <Box mb={5}>
            <Divider className={classes.spacer} />
            <List className={classes.spacer}>
              {users &&
                users.user.map((dm_user: any, index) => {
                  return dm_user.user_channels.length === 0 ? (
                    <ListItem
                      button
                      key={index}
                      onClick={() =>
                        handleAddUser(user_id, dm_user?.auth0_user_id)
                      }
                    >
                      <ListItemIcon>
                        <Badge variant="dot">
                          <Avatar className={classes.avatar}>
                            {dm_user?.username.substring(0, 2).toUpperCase()}
                          </Avatar>
                        </Badge>
                      </ListItemIcon>
                      {dm_user?.username}
                    </ListItem>
                  ) : (
                    false
                  );
                })}
            </List>
            <Divider className={classes.spacer} />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center" mt={5}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={handleClick}
            >
              Cancel
            </Button>
          </Box>
        </Grid>
      </Container>
    </>
  );
};

export default AddDirectMessageChannel;
