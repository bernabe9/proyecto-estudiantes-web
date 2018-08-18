import React from 'react';
import { object } from 'prop-types';
import Typography from '@material-ui/core/Typography';

import VerbExercise from './VerbExercise';

const Exercise = ({ exercise }) => {
  const renderExercise = () => {
    switch (exercise.tipo) {
      case 'verbos':
        return <VerbExercise exercise={exercise} />;
      default:
        return <p>Seleccione un ejerccicio</p>;
    }
  };

  return (
    <div className="container">
      <Typography variant="headline" component="h3">
        Ejercicio
      </Typography>
      {renderExercise()}
    </div>
  );
};

Exercise.propTypes = {
  exercise: object.isRequired
};

export default Exercise;
