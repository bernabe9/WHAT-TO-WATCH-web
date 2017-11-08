import HomePage from './containers/HomePage';
import NotFoundPage from './containers/NotFoundPage';

const routes = [
  { path: '/',
    component: HomePage,
    exact: true
  },
  { path: '/suggestions',
    component: HomePage
  },
  {
    component: NotFoundPage
  }
];

export default routes;
