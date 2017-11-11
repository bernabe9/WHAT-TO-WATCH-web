import React, { Component } from 'react';
import { array, func, bool } from 'prop-types';
import { connect } from 'react-redux';

import Movie from '../components/Movie';
import Spinner from '../components/common/Spinner';
import { getMovies } from '../actions/movieActions';

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
    const { movies } = this.props;
    const votedMoviesCount = movies.filter(movie => movie.ranking).length;
    if (votedMoviesCount > 4) {
      // call the endpoint to submit
    } else {
      this.setState({ error: 'Upss! Debes calificar al menos 5 películas' });
    }
  }

  render() {
    const { movies, loading } = this.props;
    const { error } = this.state;

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
  getMovies: func.isRequired
};

const mapState = state => ({
  movies: state.getIn(['movie', 'movies']).toJS(),
  loading: state.getIn(['movie', 'loading'])
});

const mapDispatch = dispatch => ({
  getMovies: () => dispatch(getMovies())
});

export default connect(mapState, mapDispatch)(SelectPage);
