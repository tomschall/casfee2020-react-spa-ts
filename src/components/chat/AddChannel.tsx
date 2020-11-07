import React, { useState } from 'react';
import { Alert } from '@material-ui/lab';
import { useAuth0 } from '@auth0/auth0-react';
import {
  useAddChannelMutation,
  useInsertMessageMutation,
} from '../../api/generated/graphql';
import Loader from '../shared/Loader';
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
  Snackbar,
} from '@material-ui/core';
import { theme } from '../../theme/theme';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import AddCircle from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import GroupAddOutlinedIcon from '@material-ui/icons/GroupAddOutlined';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {},
  nested: {
    paddingLeft: theme.spacing(0),
  },
  form: {
    flexGrow: 1,
    margin: theme.spacing(2),
    marginTop: theme.spacing(0),
  },
  checkbox: {
    color: theme.palette.primary.dark,
  },
  submit: {
    marginTop: theme.spacing(2),
  },
}));

const AddChannel: React.FC = () => {
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const [open, setOpen] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(true);
  const [channelName, setChannelName] = useState('');
  const [channelIsPrivate, setChannelIsPrivate] = useState(false);
  const { user } = useAuth0();
  const classes = useStyles();

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

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!channelName) return;
    setOpenAlert(true);

    try {
      const dataAddChannel = await addChannel({
        variables: {
          owner_id: userAuth0.sub,
          name: channelName.toLocaleLowerCase(),
          is_private: channelIsPrivate,
        },
      });

      await sendMessage({
        variables: {
          message: {
            user_id: user.sub,
            text: `Welcome to channel ${dataAddChannel.data?.insert_channel?.returning[0]?.name}`,
            channel_id: dataAddChannel.data?.insert_channel?.returning[0]?.id,
          },
        },
      });

      setOpen(false);
      setChannelName('');

      history.push(`/channel/${channelName.toLocaleLowerCase()}`);
    } catch (e) {
      setChannelName('');
      console.log('error on mutation');
      return;
    }
  };

  const handleChange = (e: any) => {
    setChannelName(e.target.value);
  };

  const handleIsPrivateChange = (e: any) => {
    setChannelIsPrivate(e.target.checked);
  };

  if (error) {
    console.log('error mutation', error);
  }

  return (
    <List className={classes.root}>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
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
          <ListItem className={classes.nested}>
            <Grid container>
              <form
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
