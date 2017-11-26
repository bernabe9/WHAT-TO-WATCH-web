import api from './apiService';

class Api {
  static getMovies() {
    return api.get('/peliculas_sugeridas');
  }

  static sendRatings(ratings) {
    return api.post('/calificar_peliculas', { ratings });
  }

  static getRecommendations(userId) {
    return api.get(`/pelis?user_id=${userId}`);
  }
}

export default Api;
