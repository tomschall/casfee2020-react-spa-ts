import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from '../../theme/theme';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Alert } from '@material-ui/lab';
import { useAuth0 } from '@auth0/auth0-react';
import {
  useWatchUsersWhoHaveNotSubscribedToChannelSubscription,
  useAddChannelUserMutation,
} from '../../api/generated/graphql';
import { useRecoilState } from 'recoil';
import { currentChannelState } from '../../atom';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
}));

const AddChannelMembers: React.FC = () => {
  const classes = useStyles();

  let history = useHistory();

  const [currentChannel, setCurrentChannel] = useRecoilState<any>(
    currentChannelState,
  );

  const { isLoading: loadingAuth0 } = useAuth0();

  const {
    data: users,
    loading,
    error,
  } = useWatchUsersWhoHaveNotSubscribedToChannelSubscription({
    variables: {
      user_id: currentChannel.owner_id,
      channel_id: currentChannel.id,
    },
  });

  const [
    addChannelUserMutation,
    {
      data: addChannelUserData,
      loading: addChannelUserLoading,
      error: addChannelUserError,
    },
  ] = useAddChannelUserMutation();

  const handleUsersToggle = async (event: any, user_id: string) => {
    await addChannelUserMutation({
      variables: {
        channel_id: currentChannel.id,
        user_id,
      },
    });
  };

  const handleClick = () => {
    history.push(`/channel/${currentChannel.name}`);
  };

  if (error || addChannelUserError)
    console.log('error on user subscription', error);

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <React.Fragment>
          <div>
            <h2 id="simple-modal-title">
              Add users to channel ({currentChannel.name})
            </h2>
            {error && (
              <Alert severity={'error'}>
                Error - something weird happened...
              </Alert>
            )}

            {(loadingAuth0 || loading) && <CircularProgress />}

            {!(loadingAuth0 || loading || error) && (
              <React.Fragment>
                <button type="button" onClick={handleClick}>
                  back to channel: {currentChannel.name}
                </button>
                <p id="simple-modal-description">
                  {users && users.user.length > 0
                    ? 'Select users that you wanna add to this channel.'
                    : 'All users have subscribed to this channel.'}
                </p>

                <List component="nav" aria-label="secondary mailbox folders">
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
                          <ListItemText primary={u.username} />
                        </ListItem>
                      );
                    })}
                </List>
              </React.Fragment>
            )}
          </div>
        </React.Fragment>
      </div>
    </ThemeProvider>
  );
};

export default AddChannelMembers;
