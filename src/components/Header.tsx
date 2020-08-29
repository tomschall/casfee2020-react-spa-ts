import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

const Header: React.FC = () => {
  return (
    <ul>
      <li>
        <Link to="/general">General</Link>
      </li>
      <li>
        <Link to="/casfee20">Casfee20</Link>
      </li>
      <li>
        <Link to="/projekt">Projekt</Link>
      </li>
      <li>
        <Link to="/bärbels-world">Bärbels-World</Link>
      </li>
    </ul>
  );
};

export default Header;
