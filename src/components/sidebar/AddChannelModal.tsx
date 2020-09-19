import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Alert } from '@material-ui/lab';
import { useAuth0 } from '@auth0/auth0-react';
import { useAddChannelMutation } from '../../api/generated/graphql';

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

interface AddChannelModalProps {
  handleClose: Function;
}

const AddChannelModal: React.FC<AddChannelModalProps> = (props) => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [channelName, setChannelName] = useState('');
  const [channelIsPrivate, setChannelIsPrivate] = useState(false);
  const [addChannel, { error, loading }] = useAddChannelMutation();
  const { user: userAuth0, isLoading: loadingAuth0 } = useAuth0();

  console.log('channelIsPrivate init', channelIsPrivate);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!channelName) return;

    try {
      await addChannel({
        variables: {
          owner_id: userAuth0.sub,
          name: channelName,
          is_private: channelIsPrivate,
        },
      });
    } catch (e) {
      console.log('error on mutation');
      return;
    }

    props.handleClose();
  };

  const handleChange = (event: any) => {
    setChannelName(event.target.value);
  };

  const handleIsPrivateChange = (event: any) => {
    setChannelIsPrivate(event.target.checked);
  };

  if (error) console.log('error mutation', error);

  let body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Add channel</h2>
      {error && (
        <Alert severity={'error'}>
          You can not use this name as it is already taken.
        </Alert>
      )}

      {(loadingAuth0 || loading) && <CircularProgress />}

      {!(loadingAuth0 || loading || error) && (
        <p id="simple-modal-description">Enter a name for the new channel.</p>
      )}

      <form onSubmit={handleSubmit}>
        <label>
          Channel Name
          <input
            disabled={loadingAuth0 || loading}
            type="text"
            value={channelName}
            onChange={handleChange}
          />
        </label>
        <label>
          Is Private
          <input
            type="checkbox"
            name="channelIsPrivate"
            checked={channelIsPrivate}
            onChange={handleIsPrivateChange}
          />
        </label>
        <br />
        <br />
        <input
          disabled={loadingAuth0 || loading}
          type="submit"
          value="Submit"
        />

        <button type="button" onClick={() => props.handleClose()}>
          Cancel
        </button>
      </form>
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

export default AddChannelModal;
