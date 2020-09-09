import React from 'react';
import Chat from './Chat';
import ChatInput from './ChatInput';
import { useRecoilState } from 'recoil';
import { atomChannelState, recoilUserState } from '../atom.js';
import { useParams } from 'react-router';
import { useQuery } from 'react-apollo';
import { useAuth0 } from '@auth0/auth0-react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { ROOM, USER } from '../data/queries';

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
    backgroundColor: '#2b0d3b',
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
  const [channelState, setChannel] = useRecoilState<any>(atomChannelState);
  const [userState, setUserState] = useRecoilState<any>(recoilUserState);
  const { isAuthenticated, isLoading, user } = useAuth0();
  const classes = useStyles();

  let { channel } = useParams();

  const { data, error } = useQuery(USER, {
    variables: {
      user_id: user?.sub,
    },
  });

  const channelObj = useQuery(ROOM);

  if (
    channelObj &&
    channelObj.data &&
    channelObj.data.channel &&
    !channelState
  ) {
    setChannel(channelObj.data.channel);
  }

  if (isAuthenticated && data && !isLoading && !userState.user_id) {
    let vars = {
      isLoggedIn: true,
      username: data.user[0].username,
      user_id: data.user[0].auth0_user_id,
      user_channels: data.user[0].user_channels,
    };
    setUserState(vars);
  }

  const username = userState.username;
  const user_id = userState.user_id;

  console.log('userState', userState);

  const userIsMemberOfChannel = userState.user_channels?.filter(
    (e: any) => e.channel.name === channel,
  );

  const userChannel = channelState?.filter((e: any) => e.name === channel);

  if (error) return <React.Fragment>Error: {error}</React.Fragment>;

  return (
    <>
      {isAuthenticated &&
      channelState &&
      userState &&
      ((userIsMemberOfChannel &&
        userIsMemberOfChannel[0]?.channel.name === channel) ||
        (userChannel && userChannel[0]?.is_private === false) ||
        (userChannel && userChannel[0]?.owner_id === userState.user_id)) ? (
        <React.Fragment>
          <Grid item direction="column" xs={8} className={classes.messageList}>
            <Typography variant="subtitle2">
              <Chat username={username} user_id={user_id} />
            </Typography>
          </Grid>
          <Grid item xs={2} className={classes.extraBox}>
            EXTRABOX
          </Grid>
          <Grid container spacing={0} xs={12} className={classes.chatInput}>
            <Grid item xs={2}></Grid>
            <Grid item className={classes.form} xs={8}>
              <ChatInput username={username} user_id={user_id} />
            </Grid>
            <Grid item xs={2}></Grid>
          </Grid>
        </React.Fragment>
      ) : (
        'you have no membership for this channel'
      )}
    </>
  );
};

export default ChatApp;
