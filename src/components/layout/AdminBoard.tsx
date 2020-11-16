import React from 'react';
import AdminContainer from '../admin/AdminContainer';
import { Container } from '@material-ui/core';

const AdminBoard: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <AdminContainer />
    </Container>
  );
};

export default AdminBoard;
