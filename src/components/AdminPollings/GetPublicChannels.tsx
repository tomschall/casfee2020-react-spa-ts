import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  Badge,
  Collapse,
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
  useWatchGetPollQuestionSubscription,
} from '../../api/generated/graphql';

const GetPublicChannels: React.FC = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const getPublicChannels = useGetPublicChannelsQuery();
  console.log('get public channels', getPublicChannels);

  const [pollQuestionId, setPollQuestion] = useRecoilState<any>(
    getPollQuestionAnswers,
  );

  const getPollQuestion = useWatchGetPollQuestionSubscription({
    variables: {
      pollQuestionId: pollQuestionId,
    },
  });

  console.log('getPublicChannel', getPollQuestion);

  const handleCollapseClick = () => {
    setOpen(!open);
  };

  const setPublicChannel = getPollQuestion.data?.poll_question[0].is_active;
  console.log('setPublicChannel', setPublicChannel);

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
          {getPublicChannels.data?.channels.map((channel) => (
            <ListItem button>
              <ListItemIcon>
                <Badge variant="dot">
                  <PeopleIcon />
                </Badge>
              </ListItemIcon>
              <ListItemText primary={channel.name} />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </List>
  );
};

export default GetPublicChannels;
