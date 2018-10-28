import React, { PureComponent } from 'react';
import { object, func, string, array } from 'prop-types';
import { connect } from 'react-redux';

import Spinner from 'components/Spinner';
import Page from 'components/Page';
import Header from 'components/Header';
import ExercisesList from 'features/exercises/components/ExercisesList';
import { fetchExercises, getExercises, setExercise } from 'modules/exercise';
import { STATE_LOADING, STATE_ERROR } from 'constants/constants';
import routes from 'constants/routesPaths';
import Title from './Title';

class ExercisesPage extends PureComponent {
  static propTypes = {
    history: object.isRequired,
    loadExercises: func.isRequired,
    setExercise: func.isRequired,
    state: string.isRequired,
    exercises: array.isRequired
  }

  componentDidMount() {
    this.props.loadExercises();
  }

  onSelectExercise = (exerciseId) => {
    const { history, setExercise } = this.props;
    setExercise(exerciseId);
    history.push(routes.exercise);
  }

  renderHeader = () => (
    <Header onRefresh={this.props.loadExercises} />
  )

  render() {
    const { state, exercises } = this.props;
    const isError = state === STATE_ERROR;
    const isLoading = state === STATE_LOADING && !isError;

    return (
      <Page Header={this.renderHeader}>
        <Title>Seleccione un ejercicio</Title>
        {isLoading && <Spinner />}
        {isError && <p>No se pueden obtener los ejercicios. Verifique su conexion a internet.</p>}
        {!isLoading && !isError &&
          <ExercisesList
            exercises={exercises}
            onSelectExercise={this.onSelectExercise}
          />
        }
      </Page>
    );
  }
}

const mapState = state => ({
  exercises: getExercises(state),
  state: state.getIn(['exercise', 'state'])
});

const mapDispatch = dispatch => ({
  loadExercises: () => dispatch(fetchExercises()),
  setExercise: id => dispatch(setExercise(id))
});

export default connect(mapState, mapDispatch)(ExercisesPage);
