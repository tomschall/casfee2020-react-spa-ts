import React, { useState, useEffect } from 'react';
import { Grid, List, Container, useMediaQuery } from '@material-ui/core';
import { Message } from '../../../interfaces/message/message.interface';
import { Box } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { makeStyles } from '@material-ui/core/styles';
import { useRecoilState } from 'recoil';
import { currentChannelState } from '../../../atom';
import SideBar from '../../shared/SideBar';
import { theme } from '../../../theme/theme';
import Thread from './Thread';

const useStyles = makeStyles((theme) => ({
  container: {
    margin: 0,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    overflowX: 'hidden',
    overflowY: 'hidden',
  },
  sidebar: {
    height: '100vh',
    maxHeight: '80vh',
    display: 'flex',
    alignItems: 'flex-start',
    paddingTop: theme.spacing(5),
    borderRightWidth: 1,
    borderRightStyle: 'solid',
    borderRightColor: theme.palette.primary.dark,
  },
}));

const ThreadContainer: React.FC = () => {
  const classes = useStyles();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <>
      <Container
        component="main"
        maxWidth="xl"
        disableGutters
        className={classes.container}
      >
        {matches === true && (
          <Grid item xs={5} className={classes.sidebar}>
            <SideBar />
          </Grid>
        )}
        <Grid item xs={12}>
          <Thread />
        </Grid>
      </Container>
    </>
  );
};

export default ThreadContainer;
