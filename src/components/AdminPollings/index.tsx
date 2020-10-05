import React, { useState } from 'react';
import {
  Badge,
  Box,
  Button,
  Container,
  Collapse,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import HelpIcon from '@material-ui/icons/Help';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import EnhancedEncryptionOutlinedIcon from '@material-ui/icons/EnhancedEncryptionOutlined';

import { useGetPollQuestionsQuery } from '../../api/generated/graphql';
import Loader from '../../layout/shared/Loader';
import NotFound from '../../layout/shared/NotFound';
import useStyles from './styles';

const AdminPollings: React.FC = () => {
  const classes = useStyles();
  const { data, loading, error } = useGetPollQuestionsQuery({
    variables: {},
  });

  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <NotFound />;
  }

  return (
    <>
      <Box className={classes.root}>
        <h2>Pollings</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos dolorum
          magnam, earum aliquid commodi voluptates officia in, eos ex ipsam quae
          ratione nesciunt porro qui vitae rem praesentium esse. Ipsa!
        </p>
      </Box>
      <Grid item xs={12}>
        <form
          noValidate
          autoComplete="off"
          className={classes.root}
          // onSubmit={handleSubmit}
        >
          <TextField
            value=""
            autoFocus={true}
            // onChange={(e) => {
            //   handleTyping(e.target.value);
            // }}
            size="medium"
            variant="outlined"
            color="secondary"
            autoComplete="off"
            placeholder="Type your question here ..."
            id="standard-basic"
            label="Add a meaningful question"
            fullWidth
            InputProps={{
              classes: {
                input: classes.messageInput,
              },
            }}
            InputLabelProps={{
              className: classes.messageInput,
            }}
          />
          <Button
            size="medium"
            type={'submit'}
            variant="contained"
            endIcon={<Icon>send</Icon>}
            className={classes.messageButton}
          >
            Submit
          </Button>
        </form>
        <Divider className={classes.divider} />
      </Grid>
      <Grid item xs={12}>
        {data?.questions.map((question) => (
          <List className={classes.root}>
            <ListItem button onClick={handleClick}>
              <ListItemIcon>
                <HowToVoteIcon />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="h6">{question.text}</Typography>
              </ListItemText>
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div">
                <ListItem key={question.id} button>
                  <ListItemIcon>
                    <HelpIcon color="secondary" />
                  </ListItemIcon>
                  <ListItemText primary="Das Huhn" />
                </ListItem>
                <ListItem key={question.id} button>
                  <ListItemIcon>
                    <HelpIcon color="secondary" />
                  </ListItemIcon>
                  <ListItemText primary="Das Ei" />
                </ListItem>
              </List>
            </Collapse>
          </List>
        ))}
      </Grid>
    </>
  );
};

export default AdminPollings;
