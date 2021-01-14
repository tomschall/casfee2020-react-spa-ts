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
    const interval = setInterval(() => {
      if (user?.sub !== undefined) {
        sendUserIsOnline();
      }
    }, 7000);
    return function cleanup() {
      clearInterval(interval);
    };
  }, [sendUserIsOnline, user]);

  return <AdminContainer />;
};

export default AdminBoard;
