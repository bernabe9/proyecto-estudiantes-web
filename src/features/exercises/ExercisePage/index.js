import React, { PureComponent } from 'react';
import { object } from 'prop-types';
import { connect } from 'react-redux';

import { getCurrentExercise } from 'modules/exercise';
import { exerciseTypes } from 'constants/constants';
import Page from 'components/Page';
import Header from 'components/Header';
import Title from './Title';
import NounExercise from '../components/NounExercise';
import FillInBlanksExercise from '../components/FillInBlanksExercise';

class ExercisePage extends PureComponent {
  static propTypes = {
    exercise: object.isRequired,
  }

  renderExercise = () => {
    const { exercise } = this.props;
    let ExerciseComponent;

    switch (exercise.tipo) {
      case exerciseTypes.sustantivos:
        ExerciseComponent = NounExercise;
        break;
      case exerciseTypes.verbos:
      case exerciseTypes.use_of_en:
        ExerciseComponent = FillInBlanksExercise;
        break;
      default:
        ExerciseComponent = () => null;
    }

    return <ExerciseComponent exercise={exercise} />;
  }

  render() {
    return (
      <Page Header={Header}>
        <Title>EJERCICIO</Title>
        {this.renderExercise()}
      </Page>
    );
  }
}

const mapState = state => ({
  exercise: getCurrentExercise(state),
});

export default connect(mapState)(ExercisePage);
