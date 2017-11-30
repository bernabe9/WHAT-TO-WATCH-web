import React, { Component } from 'react';
import { array, func, bool } from 'prop-types';
import { connect } from 'react-redux';

import Movie from '../components/Movie';
import Spinner from '../components/common/Spinner';
import RecommendedMoviesPreview from '../components/common/RecommendedMoviesPreview';
import ProgressBarLoading from '../components/common/ProgressBarLoading';
import { getMovies, sendRatings } from '../actions/movieActions';

class SelectPage extends Component {
  constructor() {
    super();

    this.state = { error: '' };

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    const { getMovies } = this.props;
    getMovies();
  }

  onSubmit() {
    this.setState({ submitted: true });
    const { movies, sendRatings } = this.props;
    const votedMovies = movies.filter(movie => movie.ranking);
    const votedMoviesCount = votedMovies.length;
    if (votedMoviesCount > 4) {
      const ratings = votedMovies.map(({ id, ranking }) => ({ movieId: id, rating: ranking }));
      sendRatings(ratings);
    } else {
      this.setState({ error: 'Upss! Debes calificar al menos 5 películas' });
    }
  }

  render() {
    const { movies, loading, submitting, getMovies } = this.props;
    const { error } = this.state;

    if (submitting) {
      return (
        <div className="select-page">
          <h1>PROCESANDO TUS CALIFICACIONES...</h1>
          <ProgressBarLoading estimatedTime={80000} />
          <h4>Películas más recomendadas</h4>
          <RecommendedMoviesPreview />
        </div>
      );
    }

    if (submitting) {
      return (
        <div className="select-page">
          <h1>CARGANDO TUS PEFERENCIAS...</h1>
        </div>
      );
    }

    return (
      <div className="select-page">
        <h1>SELECCIONA TUS PELíCULAS</h1>
        <h4>Para recomendarte las mejores películas primero debemos concerte un poco más</h4>
        <h4>Califica positivamente o negativamente al menos 5  de las siguientes películas:</h4>
        {loading ?
          <Spinner /> :
          <div className="movie-picker">
            <div className="movie-grid">
              {movies.map(movie =>
                <Movie key={movie.id} {...movie} />
              )}
            </div>
            <div onClick={() => getMovies(true)}>
              <p className="cargar-mas">
                Cargar Más
              </p>
            </div>
            <button onClick={this.onSubmit}>
              CONTINUAR
            </button>
            {error && <p>{error}</p>}
          </div>
        }
      </div>
    );
  }
}

SelectPage.propTypes = {
  movies: array.isRequired,
  loading: bool.isRequired,
  submitting: bool.isRequired,
  getMovies: func.isRequired,
  sendRatings: func.isRequired
};

const mapState = state => ({
  movies: state.getIn(['movie', 'movies']).toJS(),
  loading: state.getIn(['movie', 'loading']),
  submitting: state.getIn(['movie', 'submitting'])
});

const mapDispatch = dispatch => ({
  getMovies: append => dispatch(getMovies(append)),
  sendRatings: ratings => dispatch(sendRatings(ratings))
});

export default connect(mapState, mapDispatch)(SelectPage);
