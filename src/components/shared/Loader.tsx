import React from 'react';
import { Box, CircularProgress } from '@material-ui/core';

const Loader = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      flex={1}
    >
      <CircularProgress
        color="secondary"
        size={20}
        style={{ margin: '10px' }}
      />
    </Box>
  );
};

export default Loader;
