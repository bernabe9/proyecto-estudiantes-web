import React, { PureComponent } from 'react';
import { object } from 'prop-types';
import { connect } from 'react-redux';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { getCurrentExercise } from 'modules/exercise';
import { exerciseTypes } from 'constants/constants';
import Page from 'components/Page';
import Header from 'components/Header';
import Title from './Title';
import NounExercise from '../components/NounExercise';
import FillInBlanksExercise from '../components/FillInBlanksExercise';
import HyponymExercise from '../components/HyponymExercise';

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
      case exerciseTypes.hiponimos:
        ExerciseComponent = HyponymExercise;
        break;
      default:
        ExerciseComponent = () => null;
    }

    return <ExerciseComponent exercise={exercise} />;
  }

  render() {
    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <Page Header={Header}>
          <Title>EJERCICIO</Title>
          {this.renderExercise()}
        </Page>
      </DragDropContextProvider>
    );
  }
}

const mapState = state => ({
  exercise: getCurrentExercise(state),
});

export default connect(mapState)(ExercisePage);
