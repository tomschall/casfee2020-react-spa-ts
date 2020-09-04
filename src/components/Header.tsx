import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

const Header: React.FC = () => {
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

export default Header;
