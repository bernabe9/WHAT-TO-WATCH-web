import * as types from './actionTypes';

import Api from '../api/Api';

export const fetchMovies = () => ({
  type: types.FETCH_MOVIES
});

export const fetchMoviesSuccess = movies => ({
  movies,
  type: types.FETCH_MOVIES_SUCCESS
});

export const voteMovie = (id, vote) => ({
  id,
  vote,
  type: types.VOTE_MOVIE
});

export const getMovies = () =>
  (dispatch) => {
    dispatch(fetchMovies());
    Api.getMovies().then(({ movies }) =>
      dispatch(fetchMoviesSuccess(movies))
    );
  };
