import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from '../../theme/theme';
import ChatContainer from '../shared/Container';
import useStyles from './styles';

const ChatBoard: React.FC = () => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <ChatContainer />
      </div>
    </ThemeProvider>
  );
};

export default ChatBoard;
