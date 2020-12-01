import React from 'react';
import { theme } from '../../theme/theme';
import { Container, Grid } from '@material-ui/core/';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import SideBar from '../shared/SideBar';
import ChatApp from './ChatApp';
import { makeStyles } from '@material-ui/core/styles';

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
    maxHeight: '85vh',
    display: 'flex',
    alignItems: 'flex-start',
    paddingTop: theme.spacing(5),
    borderRightWidth: 1,
    borderRightStyle: 'solid',
    borderRightColor: theme.palette.primary.dark,
  },
}));

const ChatContainer: React.FC = () => {
  const classes = useStyles();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  return (
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
        <ChatApp />
      </Grid>
    </Container>
  );
};

export default ChatContainer;
