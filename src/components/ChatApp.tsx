import React from 'react';
import { gql } from '@apollo/client';
import Chat from './Chat';
import ChatInput from './ChatInput';
import OnlineUser from './OnlineUser';
import Sidebar from './sidebar/Sidebar';
import { useRecoilState } from 'recoil';
import { atomChannelState, recoilUserState } from '../atom.js';
import { useParams } from 'react-router';
import LogoutButton from './LogoutButton';
import { useQuery } from 'react-apollo';
import { useAuth0 } from '@auth0/auth0-react';

import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import AddChannel from './sidebar/AddChannel';

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
  root: {
    flexGrow: 1,
    margin: theme.spacing(0),
    backgroundColor: '#2b0d3b',
    height: '100vh',
    color: 'white',
    overflowX: 'hidden',
  },
  sidebar: {
    marginTop: theme.spacing(5),
    backgroundColor: '#2b0d3b',
  },
  title: {
    color: '#fff',
    fontSize: '1.5rem',
    textTransform: 'uppercase',
    fontWeight: 700,
    marginBottom: '2rem',
  },
  logo: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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

// APPOLO QUERYs
const ROOM = gql`
  query {
    channel {
      name
      id
      is_private
      owner_id
    }
  }
`;

const USER = gql`
  query($user_id: String) {
    user(where: { auth0_user_id: { _eq: $user_id } }) {
      id
      username
      auth0_user_id
      user_channels {
        channel {
          name
          id
          is_private
        }
      }
    }
  }
`;

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

  console.log('userIsMemberOfChannel', userIsMemberOfChannel);
  console.log('channelState', channelState);
  console.log('userChannel', userChannel);

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
        <div className={classes.root}>
          <Grid container spacing={3} className={classes.root}>
            <Grid item className={classes.sidebar} xs={3}>
              <div className={classes.logo}>
                <img src="/logo-chicken-chat.png" alt="Chicken Chat" />
              </div>
              <OnlineUser username={username} user_id={user_id} />
              <LogoutButton />
              <AddChannel />
              <Sidebar />
            </Grid>
            <Grid
              item
              direction="column"
              xs={8}
              className={classes.messageList}
            >
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
          </Grid>
        </div>
      ) : (
        'you have no membership for this channel'
      )}
    </>
  );
};

export default ChatApp;
