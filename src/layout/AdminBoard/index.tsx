import React from 'react';
import AdminContainer from '../shared/AdminContainer';
import useStyles from './styles';
import { Container } from '@material-ui/core';

const AdminBoard: React.FC = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="xl">
      <AdminContainer />
    </Container>
  );
};

export default AdminBoard;
