import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC<any> = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  return (
    <ul>
      <li>
        <Link to="/channel/general">General</Link>
      </li>
      <li>
        <Link to="/channel/casfee20">Casfee20</Link>
      </li>
      <li>
        <Link to="/channel/projekt">Projekt</Link>
      </li>
      <li>
        <Link to="/channel/bärbels-world">Bärbels-World</Link>
      </li>
    </ul>
  );
};

export default Sidebar;
