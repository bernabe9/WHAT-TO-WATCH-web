import React from 'react';
import Slider from 'react-slick';

import recommendedMovies from '../../constants/recommendedMovies';

const RecommendedMoviesPreview = () => {
  const settings = {
    arrows: false,
    autoplaySpeed: 5000,
    autoplay: true,
    fade: true,
    speed: 2000,
    pauseOnHover: false
  };

  return (
    <div>
      <Slider {...settings}>
        {recommendedMovies.map(movie =>
          <div key={movie.name} className="movie-preview">
            <h6>{movie.name}</h6>
            <img alt="poster" src={movie.poster} />
            <p>{movie.sinopsis}</p>
          </div>
        )}
      </Slider>
    </div>
  );
};

export default RecommendedMoviesPreview;
