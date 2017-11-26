import React, { Component } from 'react';
import { array, func, bool, number, object } from 'prop-types';
import { connect } from 'react-redux';

import Movie from '../components/Movie';
import Spinner from '../components/common/Spinner';
import { getRecommendations } from '../actions/movieActions';

class ResultsPage extends Component {
  componentWillMount() {
    const { getRecommendations, userId } = this.props;
    getRecommendations(userId);
  }

  render() {
    const { movies, loading, history } = this.props;

    return (
      <div className="select-page">
        <h1>ENCONTRAMOS LAS PELíCULAS PERFECTAS PARA TI</h1>
        <h4>Listo! Las siguientes películas son compatibles con tus gustos!</h4>
        {loading ?
          <Spinner /> :
          <div className="movie-picker">
            <div className="movie-grid">
              {movies.map((movie, index) =>
                <Movie key={index} {...movie} votesEnable={false} />
              )}
            </div>
            <button onClick={() => history.push('/select')}>
              VOVER A INTENTARLO
            </button>
          </div>
        }
      </div>
    );
  }
}

ResultsPage.propTypes = {
  movies: array.isRequired,
  loading: bool.isRequired,
  getRecommendations: func.isRequired,
  userId: number.isRequired,
  history: object
};

const mapState = state => ({
  movies: state.getIn(['movie', 'suggestedMovies']).toJS(),
  loading: state.getIn(['movie', 'loading']),
  userId: state.getIn(['movie', 'userId'])
});

const mapDispatch = dispatch => ({
  getRecommendations: userId => dispatch(getRecommendations(userId))
});

export default connect(mapState, mapDispatch)(ResultsPage);
