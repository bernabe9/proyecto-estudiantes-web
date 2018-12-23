import React, { memo } from 'react';
import { array, func } from 'prop-types';
import format from 'date-fns/format';

import List from './List';
import ListItem from './ListItem';
import ListTitle from './ListTitle';
import ListSubTitle from './ListSubTitle';
import ListSubSection from './ListSubSection';

export const formatExerciseTypes = {
  verbos: 'Verbos',
  use_of_en: 'Uso de inglés',
  sustantivos: 'Sustantivos',
  hiponimos: 'Hipónimos'
};

const ExercisesList = ({ exercises, onSelectExercise }) =>
  <List>
    {exercises.map(({ id, tipo, date }, index) =>
      <ListItem
        onClick={() => onSelectExercise(id)}
        key={id}
        button
      >
        <ListTitle>{`Ejercicio ${index + 1}`}</ListTitle>
        <ListSubSection>
          <ListSubTitle>{formatExerciseTypes[tipo]}</ListSubTitle>
          <ListSubTitle>{format(date, 'DD/MM/YYYY')}</ListSubTitle>
        </ListSubSection>
      </ListItem>)
    }
  </List>;

ExercisesList.propTypes = {
  exercises: array.isRequired,
  onSelectExercise: func.isRequired
};

export default memo(ExercisesList);
