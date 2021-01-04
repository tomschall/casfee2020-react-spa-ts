import React from 'react';
import { Alert } from '@material-ui/lab';
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { useAuth0 } from '@auth0/auth0-react';
import {
  useWatchUsersWhoHaveNotSubscribedToChannelSubscription,
  useAddChannelUserMutation,
} from '../../api/generated/graphql';
import { useRecoilState } from 'recoil';
import { currentChannelState } from '../../atom';
import { useHistory } from 'react-router-dom';
import Loader from '../shared/Loader';
import Logo from '../shared/Logo';
import { makeStyles } from '@material-ui/core/';
import OnlineUserStatus from '../shared/OnlineUserStatus';
import MobileHeaderMenu from './MobileHeaderMenu';

const useStyles = makeStyles((theme) => ({
  root: {
    overflowY: 'scroll',
    height: '100vh',
  },
  spacer: {
    marginTop: theme.spacing(5),
  },
}));

const AddChannelMembers: React.FC = () => {
  const classes = useStyles();
  let history = useHistory();
  const { isLoading: loadingAuth0 } = useAuth0();

  const [currentChannel, setCurrentChannel] = useRecoilState<any>(
    currentChannelState,
  );

  if (!currentChannel) history.push('/channel/general');

  const {
    data: users,
    loading,
    error,
  } = useWatchUsersWhoHaveNotSubscribedToChannelSubscription({
    variables: {
      user_id: currentChannel?.owner_id,
      channel_id: currentChannel?.id,
    },
  });

  const [
    addChannelUserMutation,
    { error: addChannelUserError },
  ] = useAddChannelUserMutation();

  const handleUsersToggle = async (event: any, user_id: string) => {
    await addChannelUserMutation({
      variables: {
        channel_id: currentChannel?.id,
        user_id,
      },
    });
  };

  const handleClick = () => {
    history.push(`/channel/${currentChannel?.name}`);
  };

  if (error || addChannelUserError)
    console.log('error on user subscription', error);

  return (
    <>
      <Grid item xs={12} md={9} className={classes.root} component="section">
        <MobileHeaderMenu channelName={currentChannel?.name} />
        <Box display="flex" justifyContent="center" alignItems="center">
          <Logo />
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          mt={0}
          mb={5}
        >
          <Typography id="simple-modal-title" variant="h2">
            Add users to {currentChannel?.name}
          </Typography>
          <Typography
            color="secondary"
            variant="caption"
            id="simple-modal-description"
          >
            {users && users.user.length > 0
              ? 'Select users that you wanna add to this channel.'
              : 'All users have subscribed to this channel.'}
          </Typography>
        </Box>
        <Box>
          {error && (
            <Alert severity={'error'}>
              Error - something weird happened...
            </Alert>
          )}

          {(loadingAuth0 || loading) && <Loader />}

          {!(loadingAuth0 || loading || error) && (
            <>
              <Divider className={classes.spacer} />
              <List
                component="nav"
                aria-label="secondary mailbox folders"
                className={classes.spacer}
              >
                {users &&
                  users.user.map((u: any, index) => {
                    return (
                      <ListItem
                        button
                        key={index}
                        onClick={(event) =>
                          handleUsersToggle(event, u.auth0_user_id)
                        }
                      >
                        <OnlineUserStatus user={u} />
                        <ListItemText primary={u.username} />
                      </ListItem>
                    );
                  })}
              </List>
              <Divider className={classes.spacer} />
            </>
          )}
        </Box>
      </Grid>
    </>
  );
};

export default AddChannelMembers;
