import HomePage from './containers/HomePage';
import SelectPage from './containers/SelectPage';
import ResultsPage from './containers/ResultsPage';
import NotFoundPage from './containers/NotFoundPage';

const routes = [
  {
    path: '/',
    component: HomePage,
    exact: true
  },
  {
    path: '/select',
    component: SelectPage,
    exact: true
  },
  {
    path: '/suggestions',
    component: ResultsPage
  },
  {
    component: NotFoundPage
  }
];

export default routes;
