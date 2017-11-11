import Immutable from 'immutable';

import * as types from '../actions/actionTypes';

export const initialState = Immutable.Map({
  movies: Immutable.List(),
  loading: false
});

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_MOVIES: {
      return state.set('loading', true);
    }
    case types.FETCH_MOVIES_SUCCESS: {
      const { movies } = action;
      const newState = state.set('loading', false);
      return newState.set('movies', Immutable.fromJS(movies));
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
    default: {
      return state;
    }
  }
};

export default movieReducer;
