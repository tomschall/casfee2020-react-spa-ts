import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from '../../theme/theme';
import CssBaseline from '@material-ui/core/CssBaseline';
import ChatContainer from '../shared/ChatContainer';
import useStyles from './styles';
import { Container } from '@material-ui/core';

const ChatBoard: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl">
        <CssBaseline />
        <ChatContainer />
      </Container>
    </ThemeProvider>
  );
};

export default ChatBoard;
