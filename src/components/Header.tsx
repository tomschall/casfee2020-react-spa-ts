import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

const Header: React.FC = () => {
  return (
    <ul>
      <li>
        <Link to="/general" className="ml1 no-underline black">
          General
        </Link>
      </li>
      <li>
        <Link to="/casfee20" className="ml1 no-underline black">
          Casfee20
        </Link>
      </li>
    </ul>
  );
};

export default Header;
