import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { getPollQuestionAnswers } from '../../atom';
import {
  useWatchGetChannelsSubscription,
  useAddPublishPollQuestionToChannelMutation,
  useDeletePollQuestionFromChannelMutation,
} from '../../api/generated/graphql';
import {
  Button,
  Box,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core';
import GroupAddOutlinedIcon from '@material-ui/icons/GroupAddOutlined';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import Loader from '../../components/shared/Loader';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  collapseOverlay: {
    // display: 'block',
    // position: 'absolute',
    // overflow: 'visible',
    // backgroundColor: theme.palette.primary.dark,
  },
}));

const GetChannels: React.FC = () => {
  const classes = useStyles();
  const getPollQuestionId = useRecoilValue<number>(getPollQuestionAnswers);
  const [channelID, setChannelID] = useState();
  const [open, setOpen] = React.useState(false);
  const { data, loading, error } = useWatchGetChannelsSubscription();
  const [pollQuestionToChannel] = useAddPublishPollQuestionToChannelMutation();
  const [
    deletePollQuestionFromChannelMutation,
    { error: deleteError },
  ] = useDeletePollQuestionFromChannelMutation({
    variables: {
      pollQuestionId: getPollQuestionId,
      channelId: parseInt(channelID),
    },
  });

  const handleClick = () => {
    setOpen(!open);
  };

  if (loading) {
    return (
      <Box
        width="315px"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Loader />
      </Box>
    );
  }

  if (error) {
    return <p>Error loading getChanngels</p>;
  }

  const handlePublishOnChannel = async (kanalId: number) => {
    console.log('handleChange clicked', kanalId, getPollQuestionId);

    await pollQuestionToChannel({
      variables: {
        channelID: kanalId,
        pollQuestionID: getPollQuestionId,
      },
    });

    setOpen(!open);
  };

  const handleDeleteQuestionFromChannel = async (kanalId: number) => {
    console.log(
      'handleDeleteQuestionFromChannel clicked',
      kanalId,
      getPollQuestionId,
    );

    await deletePollQuestionFromChannelMutation({
      variables: {
        pollQuestionId: getPollQuestionId,
        channelId: kanalId,
      },
    });

    if (deleteError) {
      console.log('error on delete remove question from channel');
    }
  };

  return (
    <>
      <List>
        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <GroupAddOutlinedIcon />
          </ListItemIcon>
          <ListItemText>
            <Typography variant="h6">Publish on channel</Typography>
          </ListItemText>
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto">
          <List
            component="div"
            disablePadding
            className={classes.collapseOverlay}
          >
            {data?.channel.map((chn) => (
              <ListItem button key={chn.id}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText
                  primary={chn.name}
                  onClick={() => handlePublishOnChannel(chn.id)}
                />
                <Button
                  value={chn.id}
                  onClick={() => handleDeleteQuestionFromChannel(chn.id)}
                >
                  Remove Channel
                </Button>
              </ListItem>
            ))}
          </List>
        </Collapse>
      </List>
    </>
  );
};

export default GetChannels;
