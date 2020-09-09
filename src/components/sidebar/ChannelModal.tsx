import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

import { useRecoilState } from 'recoil';
import {
  channelModalOpenState,
  recoilUserState,
  atomChannelState,
} from '../../atom.js';
import { useMutation, useQuery } from 'react-apollo';
import gql from 'graphql-tag';

const ADD_CHANNEL = gql`
  mutation($name: String, $owner_id: String, $is_private: Boolean) {
    insert_channel(
      objects: { name: $name, owner_id: $owner_id, is_private: $is_private }
    ) {
      returning {
        id
        name
        owner_id
        is_private
      }
    }
  }
`;

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: '50%',
    left: '50%',
    transform: `translate(-${top}%, -${left}%)`,
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

const ChannelModal: React.FC<any> = (props) => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [formValue, setFormValue] = useState('');

  const [channelModalOpen, setChannelModalOpen] = useRecoilState<any>(
    channelModalOpenState,
  );

  const [channelState, setChannel] = useRecoilState<any>(atomChannelState);

  const [userState, setUserState] = useRecoilState<any>(recoilUserState);

  const [sendUpdateChannel, { data, error, loading }] = useMutation(
    ADD_CHANNEL,
    {
      variables: {
        owner_id: userState.user_id,
        name: formValue,
        is_private: false,
      },
    },
  );

  if (error) {
    console.log("you can't use this name...", error);
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const resp = await sendUpdateChannel();
    if (resp && resp.data) {
      console.log('resp.data', resp.data);
      console.log('handleSubmit', channelState);
      setChannel((oldChannelList: any) => [
        ...oldChannelList,
        {
          id: resp.data.insert_channel.returning[0].id,
          name: resp.data.insert_channel.returning[0].name,
          is_private: resp.data.insert_channel.returning[0].is_private,
          owner_id: resp.data.insert_channel.returning[0].owner_id,
        },
      ]);
    }

    setChannelModalOpen(false);
  };

  const handleChange = (event: any) => {
    setFormValue(event.target.value);
  };

  const handleOpen = () => {
    setChannelModalOpen(true);
  };

  const handleClose = () => {
    setChannelModalOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Add a channel</h2>
      <p id="simple-modal-description">Here you can simply add a channel...</p>
      <form onSubmit={handleSubmit}>
        <label>
          Channel Name:
          <input type="text" value={formValue} onChange={handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );

  return (
    <div>
      <Modal
        open={channelModalOpen}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
};

export default ChannelModal;
