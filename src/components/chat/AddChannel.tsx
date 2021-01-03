import React, { useState } from 'react';
import { Alert } from '@material-ui/lab';
import { useAuth0 } from '@auth0/auth0-react';
import {
  useAddChannelMutation,
  useInsertMessageMutation,
  Channel_Type_Enum,
} from '../../api/generated/graphql';
import Loader from '../shared/Loader';
import {
  Button,
  Checkbox,
  Collapse,
  FormControlLabel,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
  Snackbar,
} from '@material-ui/core';
import { theme } from '../../theme/theme';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AddCircle from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import GroupAddOutlinedIcon from '@material-ui/icons/GroupAddOutlined';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(0),
  },
  form: {
    flexGrow: 1,
    margin: theme.spacing(2),
    marginTop: theme.spacing(0),
  },
  checkbox: {
    color: theme.palette.secondary.main,
  },
  submit: {
    marginTop: theme.spacing(2),
  },
}));

const AddChannel: React.FC = () => {
  const classes = useStyles();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const [open, setOpen] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(true);
  const [channelName, setChannelName] = useState('');
  const [channelIsPrivate, setChannelIsPrivate] = useState(false);
  const { user } = useAuth0();

  const [addChannel, { data, loading, error }] = useAddChannelMutation();

  const [
    sendMessage,
    { data: sendUpdateMessageData },
  ] = useInsertMessageMutation();

  const { user: userAuth0, isLoading: loadingAuth0 } = useAuth0();
  let history = useHistory();

  const setSnackbarPosition = () => {
    switch (matches) {
      case true:
        return 'right';
      case false:
        return 'center';

      default:
        return 'right';
    }
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const handleAlert = () => {
    setOpenAlert(!openAlert);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!channelName) return;
    setOpenAlert(true);

    const dataAddChannel = await addChannel({
      variables: {
        channel: {
          owner_id: userAuth0.sub,
          name: channelName.toLocaleLowerCase(),
          is_private: channelIsPrivate,
          channel_type: Channel_Type_Enum.ChatMessage,
        },
      },
    });

    await sendMessage({
      variables: {
        message: {
          user_id: 'admin',
          text: `Welcome to channel ${dataAddChannel.data?.insert_channel?.returning[0]?.name}`,
          channel_id: dataAddChannel.data?.insert_channel?.returning[0]?.id,
        },
      },
    });

    setOpen(false);
    setChannelName('');

    history.push(`/channel/${channelName.toLocaleLowerCase()}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChannelName(e.target.value);
  };

  const handleIsPrivateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChannelIsPrivate(e.target.checked);
  };

  if (error) {
    console.log('error mutation', error);
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <List component="div">
      <ListItem id="collapse_add_channel" button onClick={handleClick}>
        <ListItemIcon aria-label="open add channel">
          {open ? <GroupAddIcon /> : <GroupAddOutlinedIcon />}
        </ListItemIcon>
        <ListItemText primary="Add Channel" />
        {open ? (
          <RemoveCircleIcon fontSize="small" />
        ) : (
          <AddCircle color="secondary" fontSize="small" />
        )}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {(loadingAuth0 || loading) && <Loader />}
        <List component="div">
          {error && (
            <ListItem className={classes.nested}>
              <Snackbar
                open={openAlert}
                autoHideDuration={5000}
                onClose={handleAlert}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: setSnackbarPosition(),
                }}
              >
                <Alert severity={'error'} onClose={handleAlert}>
                  You can not use this name as it is already taken.
                </Alert>
              </Snackbar>
            </ListItem>
          )}
          {data && (
            <ListItem className={classes.nested}>
              <Snackbar
                open={openAlert}
                autoHideDuration={5000}
                onClose={handleAlert}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: setSnackbarPosition(),
                }}
              >
                <Alert severity={'success'} onClose={handleAlert}>
                  Channel has been added.
                </Alert>
              </Snackbar>
            </ListItem>
          )}
          <ListItem component="div" className={classes.nested}>
            <Grid container>
              <form
                id="add_channel"
                className={classes.form}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
              >
                <Grid item xs={12}>
                  <TextField
                    disabled={loadingAuth0 || loading}
                    value={channelName}
                    autoFocus={false}
                    onChange={handleChange}
                    autoComplete="off"
                    placeholder="Your channel name"
                    id="add-channel-input"
                    label="Add a new channel"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={channelIsPrivate}
                        onChange={handleIsPrivateChange}
                        color="secondary"
                        name="private"
                        className={classes.checkbox}
                      />
                    }
                    label={
                      <Typography variant="caption" color="textSecondary">
                        Private Channel
                      </Typography>
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    disabled={loadingAuth0 || loading}
                    type="submit"
                    value="Submit"
                    endIcon={<AddCircle />}
                    className={classes.submit}
                    variant="outlined"
                    arial-label="Add channel"
                  >
                    Add new channel
                  </Button>
                </Grid>
              </form>
            </Grid>
          </ListItem>
        </List>
      </Collapse>
    </List>
  );
};

export default AddChannel;
