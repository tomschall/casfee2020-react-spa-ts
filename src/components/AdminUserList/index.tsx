import React from 'react';
import { Box } from '@material-ui/core';
import AvatarGroup from '@material-ui/lab/AvatarGroup';

import useStyles from './styles';

const AdminUserList: React.FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <h2>Userlist</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, quos
        sunt magni natus suscipit nesciunt. Nostrum voluptatum suscipit
        assumenda officia in! Incidunt similique a adipisci facere neque, cum
        nesciunt reprehenderit.
      </p>
    </Box>
  );
};

export default AdminUserList;
