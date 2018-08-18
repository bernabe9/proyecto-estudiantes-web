import React, { Component, Fragment } from 'react';
import { object } from 'prop-types';

import Header from '../../components/Header';
import ExercisesList from '../../components/exercises/ExercisesList';

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
    const request = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };
    const url = 'http://localhost:3000/ejercicios';
    // simulate server delay
    setTimeout(
      () =>
        fetch(url, request)
          .then(response =>
            response.json().then((exercises) => {
              this.setState({ exercises, loading: false });
            }))
          .catch(() => {
            // mock response
            const exercises = [
              { name: 'test', id: 2 }
            ];
            this.setState({ exercises, loading: false });
          }),
      2000
    );
  }

  findExerciseById = (id) => {
    const { exercises } = this.state;
    return exercises.find(exercise => exercise._id === id);
  }

  render() {
    const { loading, exercises } = this.state;

    return (
      <Fragment>
        <Header />
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
