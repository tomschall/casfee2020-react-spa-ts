import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useAuth0 } from '@auth0/auth0-react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import { useGetChannelByNameQuery } from '../api/generated/graphql';
import ChannelTreadSidebar from './ChannelThreadSidebar';
import Chat from './Chat';
import { useRecoilState } from 'recoil';
import { currentChannelState } from '../atom';

// MUI STYLES
const useStyles = makeStyles((theme) => ({
  '@global': {
    '*::-webkit-scrollbar': {
      width: '1em',
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
    },
  },

  title: {
    color: '#fff',
    fontSize: '1.5rem',
    textTransform: 'uppercase',
    fontWeight: 700,
    marginBottom: '2rem',
  },

  messageList: {
    marginTop: theme.spacing(5),
    overflowY: 'auto',
    overflowX: 'hidden',
    height: '70vh',
  },
  chatInput: {
    padding: theme.spacing(0),
    // backgroundColor: '#2b0d3b',
    // height: '20vh',
  },
  extraBox: {
    // backgroundColor: '#2b0d3b',
  },
  form: {
    // backgroundColor: '#2b0d3b',
  },
}));

const ChatApp: React.FC = (props) => {
  const [currentChannel, setCurrentChannel] = useRecoilState<any>(
    currentChannelState,
  );

  console.table(currentChannel?.name);

  const classes = useStyles();
  const {
    isAuthenticated,
    isLoading: isLoadingAuth0,
    user,
    error,
  } = useAuth0();
  // const { channel: channelName } = useParams();
  // const {
  //   data,
  //   loading: channelLoading,
  //   error: channelError,
  // } = useGetChannelByNameQuery({
  //   variables: {
  //     name: channelName,
  //   },
  // });

  // if (isLoadingAuth0 || channelLoading) {
  //   return <CircularProgress />;
  // }

  // if (
  //   !currentChannel ||
  //   (currentChannel && currentChannel.name !== channelName)
  // ) {
  //   setCurrentChannel(data?.channel[0]);
  // }

  // if (error || channelError || !currentChannel) {
  //   return <React.Fragment>Error: {error}</React.Fragment>;
  // }

  return (
    <>
      {isAuthenticated && (
        <React.Fragment>
          <Grid item direction="column" xs={6} className={classes.messageList}>
            <Typography variant="subtitle2">
              <Chat channelId={currentChannel?.id} />
            </Typography>
          </Grid>
          <Grid item xs={2} className={classes.extraBox}>
            <ChannelTreadSidebar />
          </Grid>
        </React.Fragment>
      )}
    </>
  );
};

export default ChatApp;
