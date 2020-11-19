import React from 'react';
import { Grid, Container, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SideBar from '../../shared/SideBar';
import { theme } from '../../../theme/theme';
import Thread from './Thread';
import ThreadListContainer from './ThreadListContainer';
import { useParams } from 'react-router';
import { ThreadParams } from '../../../interfaces/param.interface';

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
  const { channel } = useParams<ThreadParams>();

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
          {channel ? <Thread /> : <ThreadListContainer />}
        </Grid>
      </Container>
    </>
  );
};

export default ThreadContainer;
