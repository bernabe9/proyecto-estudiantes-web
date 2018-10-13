import React, { Component, Fragment } from 'react';
import { object } from 'prop-types';

import Header from '../../components/Header';
import ExercisesList from '../../components/exercises/ExercisesList';
import exerciseApi from '../../api/exerciseApi';

class ExercisesPage extends Component {
  static propTypes = {
    history: object.isRequired
  }

  state = { exercises: [], loading: true }

  componentDidMount() {
    this.getExercises();
  }

  onSelectExercise = (exerciseId) => {
    const { history } = this.props;
    const exercise = this.findExerciseById(exerciseId);
    history.push({
      pathname: '/ejercicio',
      state: { exercise }
    });
  }

  getExercises = () => {
    this.setState({ loading: true });
    exerciseApi.getExercises()
      .then(exercises => this.setState({ exercises, loading: false }));
  }

  findExerciseById = (id) => {
    const { exercises } = this.state;
    return exercises.find(exercise => exercise.id === id);
  }

  render() {
    const { loading, exercises } = this.state;

    return (
      <Fragment>
        <Header onRefresh={this.getExercises} />
        <div className="exercise-page">
          <div className="container">
            <ExercisesList
              exercises={exercises}
              loading={loading}
              onSelectExercise={this.onSelectExercise}
            />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default ExercisesPage;
