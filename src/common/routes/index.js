import routesPaths from 'constants/routesPaths';
import ExercisesPage from 'features/exercises/ExercisesPage';
import ExercisePage from 'features/exercises/ExercisePage';

const routes = [
  {
    path: routesPaths.index,
    component: ExercisesPage,
    exact: true
  },
  {
    path: routesPaths.exercise,
    component: ExercisePage
  }
];

export default routes;
