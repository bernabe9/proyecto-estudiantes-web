import routesPaths from './constants/routesPaths';
import ExercisePage from './containers/ExercisePage';
import ExercisesPage from './containers/ExercisesPage';

const routes = [
  {
    path: routesPaths.index,
    component: ExercisesPage,
    exact: true,
  },
  {
    path: routesPaths.login,
    component: ExercisePage
  },
];

export default routes;
