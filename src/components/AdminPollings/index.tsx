import React from 'react';
import { Avatar, Box } from '@material-ui/core';
import AvatarGroup from '@material-ui/lab/AvatarGroup';

import useStyles from './styles';

const AdminPollings: React.FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <h2>Pollings</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos dolorum
        magnam, earum aliquid commodi voluptates officia in, eos ex ipsam quae
        ratione nesciunt porro qui vitae rem praesentium esse. Ipsa!
      </p>
    </Box>
  );
};

export default AdminPollings;
