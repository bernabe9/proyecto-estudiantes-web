import React from 'react';
import { bool, array, func, object } from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = () => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#f3f4fa',
  }
});

export const formatExerciseTypes = {
  verbos: 'Verbos',
  use_of_en: 'Uso de inglés',
  sustantivos: 'Sustantivos'
};

const ExercisesList = ({ loading, exercises, onSelectExercise, classes }) => {
  if (loading) {
    return <CircularProgress />;
  }

  return (
    <List className={classes.root}>
      {exercises.map(({ id, tipo }, index) =>
        <ListItem
          onClick={() => onSelectExercise(id)}
          key={id}
          button
        >
          <ListItemText
            primary={`Ejercicio ${index + 1}`}
            secondary={formatExerciseTypes[tipo]}
          />
        </ListItem>)
      }
    </List>
  );
};

ExercisesList.propTypes = {
  loading: bool.isRequired,
  exercises: array.isRequired,
  onSelectExercise: func.isRequired,
  classes: object.isRequired
};

export default withStyles(styles)(ExercisesList);
