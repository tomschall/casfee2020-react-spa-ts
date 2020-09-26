import React from 'react';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import { theme } from '../../theme/theme';
// import { ThemeProvider } from '../../theme/includes';
// import useStyles from './styles';

const ChatBoard: React.FC = () => {
  const classes = useStyles();

  return (
    // <ThemeProvider theme={theme}>
    <div className={classes.root}>
      {/* <CssBaseline /> */}
      <h1>BASE CHAT TEMPLATE</h1>
    </div>
    // </ThemeProvider>
  );
};

export default ChatBoard;
