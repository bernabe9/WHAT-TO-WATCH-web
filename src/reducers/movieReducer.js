import Immutable from 'immutable';

import * as types from '../actions/actionTypes';

export const initialState = Immutable.Map({
  movies: Immutable.List(),
  suggestedMovies: Immutable.List(),
  loading: false,
  userId: undefined
});

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_MOVIES: {
      const { append } = action;
      return state.set('loading', !append);
    }
    case types.FETCH_MOVIES_SUCCESS: {
      const { movies, append } = action;
      const newState = state.set('loading', false);
      if (!append) {
        return newState.set('movies', Immutable.fromJS(movies));
      }
      const allMovies = state.get('movies').concat(Immutable.fromJS(movies));
      const allMoviesWithoutDuplicates = allMovies.groupBy(movie => movie.get('id')).map(x => x.first()).toList();
      return newState.set('movies', allMoviesWithoutDuplicates);
    }
    case types.VOTE_MOVIE: {
      const { id, vote } = action;
      const movies = state.get('movies');
      const newMovies = movies.update(
        movies.findIndex(movie => movie.get('id') === id),
        movie => movie.set('ranking', vote ? 5 : 1)
      );
      return state.set('movies', newMovies);
    }
    case types.SUBMITTING_RATINGS: {
      return state.set('loading', true);
    }
    case types.SUBMIT_RATINGS_SUCCESS: {
      const { userId } = action;
      const newState = state.set('loading', false);
      return newState.set('userId', userId);
    }
    case types.SUBMIT_RATINGS_ERROR: {
      return state.set('loading', false);
    }
    case types.FETCH_RECOMMENDATIONS: {
      return state.set('loading', true);
    }
    case types.FETCH_RECOMMENDATIONS_SUCCESS: {
      const { movies } = action;
      const newState = state.set('loading', false);
      return newState.set('suggestedMovies', Immutable.fromJS(movies));
    }
    default: {
      return state;
    }
  }
};

export default movieReducer;
