import React from 'react';
import { useRecoilValue } from 'recoil';
import {
  Box,
  Button,
  Checkbox,
  Collapse,
  FormControlLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Switch,
} from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/People';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { getPollQuestionAnswers } from '../../atom';
import {
  useGetPublicChannelsQuery,
  useGetChannelPollsQuery,
  useWatchGetChannelPollQuestionPublishStateSubscription,
  useAddPublishPollQuestionToChannelMutation,
} from '../../api/generated/graphql';

const GetPublicChannels: React.FC = () => {
  const [open, setOpen] = React.useState<boolean>(true);
  const [toggleCheckbox, setToggleCheckbox] = React.useState<boolean>();
  const getPublicChannels = useGetPublicChannelsQuery();

  const getChannelPollQuestionPublishState = useWatchGetChannelPollQuestionPublishStateSubscription();
  console.log('Question State: ', getChannelPollQuestionPublishState);

  const getChannelPolls = useGetChannelPollsQuery();
  const getPollQuestionId = useRecoilValue<number>(getPollQuestionAnswers);
  const [pollQuestionToChannel] = useAddPublishPollQuestionToChannelMutation();
  console.log(
    'getChannelPolls',
    getChannelPolls.data?.channelPoll[0].id,
    getChannelPolls.data?.channelPoll[0].poll_questions,
  );

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setToggleCheckbox(!toggleCheckbox);

    await pollQuestionToChannel({
      variables: {
        channelID: parseInt(e.target.value),
        pollQuestionID: getPollQuestionId,
      },
    });
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
        {/* <List component="div" key={2}>
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
          </List> */}
        <List component="div" key={3}>
          {getChannelPollQuestionPublishState.data?.getChannelPollQuestionPublishState.map(
            (questionState) => (
              <>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  flexDirection="row"
                  flex={1}
                >
                  <FormControlLabel
                    control={
                      <Switch
                        value={questionState.channel_id}
                        onChange={handleChange}
                        name={questionState.channel.name}
                        size="medium"
                        // disabled={toggleCheckbox}
                      />
                    }
                    label="Select channel"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={questionState?.poll_question?.is_active}
                        onChange={handleChange}
                        name={JSON.stringify(questionState.channel.name)}
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                      />
                    }
                    label={questionState.channel.name}
                  />

                  <p>{questionState?.poll_question?.text}</p>
                  <Button
                    color={
                      questionState.poll_questions === getPollQuestionId
                        ? 'primary'
                        : 'secondary'
                    }
                  >
                    {questionState.poll_questions === getPollQuestionId ? (
                      <>{questionState.channel.name}</>
                    ) : (
                      <>{questionState.channel.name}</>
                    )}
                  </Button>
                </Box>
              </>
            ),
          )}
        </List>
      </Collapse>
    </List>
  );
};

export default GetPublicChannels;
