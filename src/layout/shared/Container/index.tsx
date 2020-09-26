import React from 'react';

import { theme } from '../../../theme/theme';
import { Container, Grid, Box } from '@material-ui/core/';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useStyles from './styles';

import SideBar from '../Sidebar';
// import MessageList from '../../../views/messageList';
import MenuBar from '../MenuBar';

const ChatContainer: React.FC = () => {
  const classes = useStyles();
  // const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
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
            {/* <MessageList /> */}
          </Grid>
        </Container>
      </main>
      <Box maxWidth="xl" component="nav">
        <MenuBar />
      </Box>
    </>
  );
};

export default ChatContainer;
