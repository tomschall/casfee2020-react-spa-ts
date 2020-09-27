import React, { useState } from 'react';
import { Alert } from '@material-ui/lab';
import { useAuth0 } from '@auth0/auth0-react';
import { useAddChannelMutation } from '../../api/generated/graphql';
import Loader from '../../layout/shared/Loader';
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import AddCircle from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import GroupAddOutlinedIcon from '@material-ui/icons/GroupAddOutlined';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import useStyles from './styles';

// interface AddChannelModalProps {
//   handleClose: Function;
// }

const AddChannel: React.FC = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [channelName, setChannelName] = useState('');
  const [channelIsPrivate, setChannelIsPrivate] = useState(false);
  const [addChannel, { error, loading }] = useAddChannelMutation();
  const { user: userAuth0, isLoading: loadingAuth0 } = useAuth0();

  const handleClick = () => {
    setOpen(!open);
  };

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

    // props.handleClose();
  };

  const handleChange = (event: any) => {
    setChannelName(event.target.value);
  };

  const handleIsPrivateChange = (event: any) => {
    setChannelIsPrivate(event.target.checked);
  };

  if (error) console.log('error mutation', error);

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
              <Alert severity={'error'}>
                You can not use this name as it is already taken.
              </Alert>
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
                    id="standard-basic"
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
                  {/* <Button onClick={() => props.handleClose()}>Cancel</Button> */}
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
