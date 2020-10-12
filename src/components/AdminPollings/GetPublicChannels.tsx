import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  Badge,
  Checkbox,
  Collapse,
  FormControlLabel,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Loader from '../../layout/shared/Loader';
import PeopleIcon from '@material-ui/icons/People';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import EnhancedEncryptionOutlinedIcon from '@material-ui/icons/EnhancedEncryptionOutlined';
import useStyles from './styles';

import {
  useGetPublicChannelsQuery,
  useWatchGetPollQuestionSubscription,
} from '../../api/generated/graphql';

const GetPublicChannels: React.FC = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState<true | false>(true);
  const [toggleCheckbox, setToggleCheckbox] = React.useState<Boolean>();
  const getPublicChannels = useGetPublicChannelsQuery();

  const handleChange = (e: any) => {
    setToggleCheckbox(!toggleCheckbox);
    console.log('hello checkbox', toggleCheckbox, e.target.checked);
  };

  const handleCollapseClick = () => {
    setOpen(!open);
  };

  return (
    <List>
      <ListItem button onClick={handleCollapseClick}>
        <ListItemIcon>
          <PeopleOutlineIcon />
        </ListItemIcon>
        <ListItemText>
          <Typography variant="h6">Publish on channel</Typography>
        </ListItemText>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div">
          {getPublicChannels.data?.channels.map((channel, index: any) => (
            <ListItem button key={index}>
              <ListItemIcon>
                <Badge variant="dot">
                  <PeopleIcon />
                </Badge>
              </ListItemIcon>
              <FormControlLabel
                control={
                  <Checkbox
                    // checked={
                    //   channel.channel_polls[0]?.poll_question?.is_active
                    //     ? true
                    //     : false
                    // }
                    onChange={handleChange}
                    name={channel.name}
                  />
                }
                label={channel.name}
              />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </List>
  );
};

export default GetPublicChannels;
