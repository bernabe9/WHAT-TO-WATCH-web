import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => (
  <div className="home-page">
    <h1>WHAT TO WATCH?</h1>
    <h4>
      ¡La diversión está por comenzar! <br />
      Estás a sólo un click de descubrir las películas perfectas para ti...
    </h4>
    <Link to="/select">COMENZAR</Link>
  </div>
);

export default HomePage;
