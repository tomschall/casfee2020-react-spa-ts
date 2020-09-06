import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div>
      <p>
        Welcome to Chicken Fest Chat. <br />
      </p>
      <p>
        Go to <Link to="/dashboard">Dashboard</Link>
      </p>
    </div>
  );
};

export default Home;
