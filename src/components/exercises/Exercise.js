import React from 'react';
import { object } from 'prop-types';
import Typography from '@material-ui/core/Typography';

import VerbExercise from './VerbExercise';
import NounExercise from './NounExercise';
import { exerciseTypes } from '../../constants/constants';

const Exercise = ({ exercise }) => {
  const isVerbos = exercise.tipo === exerciseTypes.verbos;
  const isUseOfEnglish = exercise.tipo === exerciseTypes.use_of_en;
  const IsFillInBlank = isVerbos || isUseOfEnglish;

  return (
    <div className="container">
      <Typography variant="headline" component="h3">
        Ejercicio
      </Typography>
      {IsFillInBlank ?
        <VerbExercise exercise={exercise} /> :
        <NounExercise exercise={exercise} />
      }
    </div>
  );
};

Exercise.propTypes = {
  exercise: object.isRequired
};

export default Exercise;
