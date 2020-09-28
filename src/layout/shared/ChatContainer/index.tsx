import React from 'react';

import { theme } from '../../../theme/theme';
import { Container, Grid } from '@material-ui/core/';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useStyles from './styles';

import SideBar from '../Sidebar';
import ChatApp from '../../../components/chatApp';

const ChatContainer: React.FC = () => {
  const classes = useStyles();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <>
      <main className={classes.root}>
        <Container maxWidth="xl" disableGutters className={classes.container}>
          {matches === true && (
            <Grid item xs={5} className={classes.sidebar}>
              <SideBar />
            </Grid>
          )}
          <Grid item xs={12}>
            <ChatApp />
          </Grid>
        </Container>
      </main>
    </>
  );
};

export default ChatContainer;