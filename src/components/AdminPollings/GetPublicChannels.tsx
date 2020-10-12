import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
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

import { getPollQuestionAnswers } from '../../atom';
import {
  useGetPublicChannelsQuery,
  useGetChannelPollsQuery,
  useAddPublishPollQuestionToChannelMutation,
} from '../../api/generated/graphql';

const GetPublicChannels: React.FC = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState<boolean>(true);
  const [toggleCheckbox, setToggleCheckbox] = React.useState<boolean>();
  const getPublicChannels = useGetPublicChannelsQuery();
  const getChannelPolls = useGetChannelPollsQuery();
  const getPollQuestionId = useRecoilValue<number>(getPollQuestionAnswers);
  const [
    addPublishPollQuestionToChannelMutation,
    { data, loading, error },
  ] = useAddPublishPollQuestionToChannelMutation();

  console.log('getChannelPolls', getChannelPolls);

  const handleChange = async (e: any) => {
    setToggleCheckbox(!toggleCheckbox);
    console.log(
      'checkbox',
      toggleCheckbox,
      e.target.checked,
      e.target.value,
      getPublicChannels,
    );

    try {
      await addPublishPollQuestionToChannelMutation({
        variables: {
          channelID: e.target.value,
          pollQuestionID: getPollQuestionId,
        },
      });
    } catch (e) {
      console.log('error on mutation addPollQuestion');
    }
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
                    value={channel.id}
                    onChange={handleChange}
                    name={channel.name}
                    size="medium"
                  />
                }
                label={channel.id + ' - ' + channel.name}
              />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </List>
  );
};

export default GetPublicChannels;
