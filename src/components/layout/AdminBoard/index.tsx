import React from 'react';
import AdminContainer from '../../shared/AdminContainer';
import { Container } from '@material-ui/core';

const AdminBoard: React.FC = () => {
  return (
    <Container maxWidth="xl">
      <AdminContainer />
    </Container>
  );
};

export default AdminBoard;
