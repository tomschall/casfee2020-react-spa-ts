import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Alert } from '@material-ui/lab';
import { useAuth0 } from '@auth0/auth0-react';
import {
  useAddChannelMutation,
  useWatchUsersSubscription,
  useAddChannelUserMutation,
} from '../../api/generated/graphql';
import { useParams } from 'react-router';
import { useRecoilState } from 'recoil';
import { currentChannelState } from '../../atom';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom';

function getModalStyle() {
  return {
    top: '50%',
    left: '50%',
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }),
);

interface AddChannelUserModalProps {
  handleClose: Function;
}

const AddChannelUserModal: React.FC<AddChannelUserModalProps> = (props) => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const { channel: channelName } = useParams();
  const [currentChannel, setCurrentChannel] = useRecoilState<any>(
    currentChannelState,
  );

  const { user: userAuth0, isLoading: loadingAuth0 } = useAuth0();

  const [usertoAdd, setUsersToAdd] = useState('');

  const { data: users, loading, error } = useWatchUsersSubscription();

  const [
    addChannelUserMutation,
    {
      data: addChannelUserData,
      loading: addChannelUserLoading,
      error: addChannelUserError,
    },
  ] = useAddChannelUserMutation();

  console.log('currentChannel', currentChannel);
  console.log('users', users);

  const handleChange = (event: any) => {};
  const handleUsersToggle = async (event: any, user_id: string) => {
    console.log('event', event);
    console.log('user_id', user_id);

    try {
      await addChannelUserMutation({
        variables: {
          channel_id: currentChannel.id,
          user_id,
        },
      });
    } catch (e) {
      console.log('error on mutation');
      return;
    }
  };

  if (error) console.log('error mutation', error);

  let body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">
        Add users to channel ({currentChannel.name})
      </h2>
      {error && (
        <Alert severity={'error'}>Error - something weird happened...</Alert>
      )}

      {(loadingAuth0 || loading) && <CircularProgress />}

      {!(loadingAuth0 || loading || error) && (
        <p id="simple-modal-description">
          Select users that you wanna add to this channel.
        </p>
      )}

      <List component="nav" aria-label="secondary mailbox folders">
        {users &&
          users.user.map((u: any) => {
            return (
              <ListItem
                button
                key={u.id}
                onClick={(event) => handleUsersToggle(event, u.auth0_user_id)}
              >
                <ListItemText primary={u.username} />
              </ListItem>
            );
          })}
      </List>
      <button type="button" onClick={() => props.handleClose()}>
        Cancel
      </button>
    </div>
  );

  return (
    <Modal
      open={true}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {body}
    </Modal>
  );
};

export default AddChannelUserModal;
