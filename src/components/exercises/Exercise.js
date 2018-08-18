import React from 'react';
import { object } from 'prop-types';
import Typography from '@material-ui/core/Typography';

import VerbExercise from './VerbExercise';

const Exercise = ({ exercise }) => (
  <div className="container">
    <Typography variant="headline" component="h3">
      Ejercicio
    </Typography>
    {exercise.tipo === 'verbos' ?
      <VerbExercise exercise={exercise} /> :
      <p>Seleccione un ejerccicio</p>
    }
  </div>
);

Exercise.propTypes = {
  exercise: object.isRequired
};

export default Exercise;
