import React from 'react';
import { useRecoilValue } from 'recoil';
import {
  Badge,
  Checkbox,
  Collapse,
  FormControlLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/People';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { getPollQuestionAnswers } from '../../atom';
import {
  useGetPublicChannelsQuery,
  useGetChannelPollsQuery,
  useAddPublishPollQuestionToChannelMutation,
} from '../../api/generated/graphql';

const GetPublicChannels: React.FC = () => {
  const [open, setOpen] = React.useState<boolean>(true);

  const [toggleCheckbox, setToggleCheckbox] = React.useState<boolean>();

  const getPublicChannels = useGetPublicChannelsQuery();

  const getChannelPolls = useGetChannelPollsQuery();

  const getPollQuestionId = useRecoilValue<number>(getPollQuestionAnswers);

  const [pollQuestionToChannel] = useAddPublishPollQuestionToChannelMutation();

  console.log('getChannelPolls', getChannelPolls);

  const handleChange = async (e: any) => {
    setToggleCheckbox(!toggleCheckbox);
    console.log(
      'CHECKBOX TOGGLE',
      e.target.value,
      getPollQuestionId,
      toggleCheckbox,
    );

    try {
      await pollQuestionToChannel({
        variables: {
          channelID: e.target.value,
          pollQuestionID: getPollQuestionId,
        },
      });
    } catch (e) {
      console.log('error on pollQuestionToChannel mutation');
    }
  };

  const handleCollapseClick = () => {
    setOpen(!open);
  };

  return (
    <List>
      <ListItem button onClick={handleCollapseClick} key={100}>
        <ListItemIcon>
          <PeopleOutlineIcon />
        </ListItemIcon>
        <ListItemText>
          <Typography variant="h6">Publish on channel</Typography>
        </ListItemText>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" key={2}>
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
                    // disabled={toggleCheckbox}
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
