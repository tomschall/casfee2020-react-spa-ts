import React, { useEffect, useState } from 'react';
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
  ListItemText,
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
import Logo from '../shared/Logo';
import { makeStyles } from '@material-ui/core/styles';
import OnlineUserStatus from '../shared/OnlineUserStatus';

const useStyles = makeStyles((theme) => ({
  spacer: {
    marginTop: theme.spacing(5),
  },
}));

const AddDirectMessageChannel: React.FC = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const { user } = useAuth0();

  const [users, setUsers] = useState<any>(null);

  const user_id = user.sub;

  let history = useHistory();

  const {
    data,
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

  useEffect(() => {
    const checkUserSubscriptions = async () => {
      return data?.user.filter((u) => {
        return (
          u.user_channels.filter((user_channel) => {
            return user_channel.channel.user_channels.length === 1;
          }).length === 0
        );
      });
    };
    const check = async () => {
      const users = await checkUserSubscriptions();
      setUsers(users);
    };
    check();
  }, [data]);

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
          <Box display="flex" justifyContent="center" alignItems="center">
            <Logo />
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            mb={5}
          >
            <Typography variant="h2">Add a user</Typography>
            <Typography
              color="secondary"
              variant="caption"
              id="simple-modal-description"
            >
              {users?.length
                ? 'Select users that you wanna send direct messages to.'
                : ''}
            </Typography>
          </Box>
          <Box mb={5}>
            <Divider className={classes.spacer} />
            {users?.length && (
              <List className={classes.spacer}>
                {users?.map((dm_user: any, index: any) => {
                  return (
                    <ListItem
                      button
                      key={index}
                      onClick={() =>
                        handleAddUser(user_id, dm_user.auth0_user_id)
                      }
                    >
                      <OnlineUserStatus user={dm_user} />
                      <ListItemText primary={dm_user.username} />
                    </ListItem>
                  );
                })}
              </List>
            )}
            {users?.length === 0 && (
              <Alert severity={'success'}>
                All users have been added. U can send a message, by clicking on
                the user in the menu sidebar in direct messages.
              </Alert>
            )}
            <Divider className={classes.spacer} />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center" mt={5} mb={5}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={handleClick}
              aria-label="back to channel"
            >
              Back to Channel
            </Button>
          </Box>
        </Grid>
      </Container>
    </>
  );
};

export default AddDirectMessageChannel;
