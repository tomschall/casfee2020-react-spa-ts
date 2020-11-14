import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useRecoilState } from 'recoil';
import { testState } from '../../../atom.js';
import { Typography, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  [theme.breakpoints.up('md')]: {
    messageText: {
      paddingBottom: '1rem',
    },
  },
  [theme.breakpoints.down('md')]: {
    messageText: {
      fontSize: 14,
      paddingBottom: '1rem',
    },
  },
  [theme.breakpoints.down('sm')]: {
    messageText: {
      fontSize: 12,
      paddingBottom: '1rem',
    },
  },
}));

const ThreadReplyIn: React.FC<any> = (props) => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const [recoilTestState, setTestState] = useRecoilState<any>(testState);
  const classes = useStyles();

  useEffect(() => {
    console.log('message', props.message);
    console.log(`/thread/${props.message?.id}`);
  }, []);

  return (
    <Typography component="div" className={classes.messageText}>
      <Link
        to={{
          pathname: `/thread/${props.message?.id}`,
        }}
      >
        xxx replies Last reply today at 6: 10 PM
      </Link>
    </Typography>
  );
};

export default ThreadReplyIn;
