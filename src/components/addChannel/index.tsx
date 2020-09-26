import React from 'react';
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

const AddChannel: React.FC = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

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
        <List component="div">
          <ListItem className={classes.nested}>
            <Grid container>
              <form className={classes.form} noValidate autoComplete="off">
                <Grid item xs={12}>
                  <TextField
                    value=""
                    autoFocus={false}
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
