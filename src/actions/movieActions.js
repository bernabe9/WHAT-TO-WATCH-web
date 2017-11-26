import { push } from 'react-router-redux';

import * as types from './actionTypes';
import Api from '../api/Api';

export const fetchMovies = append => ({
  append,
  type: types.FETCH_MOVIES
});

export const fetchMoviesSuccess = (movies, append) => ({
  movies,
  append,
  type: types.FETCH_MOVIES_SUCCESS
});

export const voteMovie = (id, vote) => ({
  id,
  vote,
  type: types.VOTE_MOVIE
});

export const submittingRatings = () => ({
  type: types.SUBMITTING_RATINGS
});

export const submitRatingsSuccess = userId => ({
  userId,
  type: types.SUBMIT_RATINGS_SUCCESS
});

export const submitRatingsError = () => ({
  type: types.SUBMIT_RATINGS_ERROR
});

export const fetchRecommendations = () => ({
  type: types.FETCH_RECOMMENDATIONS
});

export const fetchRecommendationsSuccess = movies => ({
  movies,
  type: types.FETCH_RECOMMENDATIONS_SUCCESS
});

export const getMovies = (append = false) =>
  (dispatch) => {
    dispatch(fetchMovies(append));
    Api.getMovies().then(({ movies }) =>
      dispatch(fetchMoviesSuccess(movies, append))
    );
  };

export const sendRatings = ratings =>
  (dispatch) => {
    dispatch(submittingRatings());
    Api.sendRatings(ratings).then(({ userId }) => {
      dispatch(submitRatingsSuccess(userId));
      dispatch(push('/suggestions'));
    }).catch(() => dispatch(submitRatingsError()));
  };

export const getRecommendations = userId =>
  (dispatch) => {
    dispatch(fetchRecommendations());
    Api.getRecommendations(userId).then((movies) => {
      dispatch(fetchRecommendationsSuccess(movies));
    });
  };
