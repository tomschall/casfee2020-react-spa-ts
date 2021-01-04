import React, { useEffect } from 'react';
import AdminContainer from '../admin/AdminContainer';
import { useAuth0 } from '@auth0/auth0-react';
import { useSetUserOnlineMutation } from '../../api/generated/graphql';

const AdminBoard: React.FC = () => {
  const { user } = useAuth0();

  const [sendUserIsOnline] = useSetUserOnlineMutation({
    variables: { user_id: user?.sub },
  });

  useEffect(() => {
    setInterval(() => {
      if (user?.sub !== undefined) {
        sendUserIsOnline();
      }
    }, 9000);
  }, [sendUserIsOnline, user?.sub]);

  return <AdminContainer />;
};

export default AdminBoard;
