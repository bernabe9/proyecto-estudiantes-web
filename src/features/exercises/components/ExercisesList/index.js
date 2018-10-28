import React, { memo } from 'react';
import { array, func } from 'prop-types';

import List from './List';
import ListItem from './ListItem';
import ListTitle from './ListTitle';
import ListSubTitle from './ListSubTitle';

export const formatExerciseTypes = {
  verbos: 'Verbos',
  use_of_en: 'Uso de inglés',
  sustantivos: 'Sustantivos'
};

const ExercisesList = ({ exercises, onSelectExercise }) =>
  <List>
    {exercises.map(({ id, tipo }, index) =>
      <ListItem
        onClick={() => onSelectExercise(id)}
        key={id}
        button
      >
        <ListTitle>{`Ejercicio ${index + 1}`}</ListTitle>
        <ListSubTitle>{formatExerciseTypes[tipo]}</ListSubTitle>
      </ListItem>)
    }
  </List>;

ExercisesList.propTypes = {
  exercises: array.isRequired,
  onSelectExercise: func.isRequired
};

export default memo(ExercisesList);
