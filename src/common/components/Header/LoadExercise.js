import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import humps from 'humps';

import routes from 'constants/routesPaths';
import { setExercise, saveExercises } from 'modules/exercise';
import Button from './Button';

const LoadExercise = ({ history, setExercise, loadExercises }) => {
  const fileInput = React.createRef();

  const onOpen = () => {
    fileInput.current.click();
  };

  const onReaderLoad = (event) => {
    const data = JSON.parse(event.target.result);
    const exercise = humps.camelizeKeys(data);
    loadExercises([exercise]);
    setExercise(exercise.id);
    history.push(routes.exercise);
  };

  const onChange = (event) => {
    const reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(event.target.files[0]);
  };

  return (
    <Fragment>
      <Button onClick={onOpen}>Cargar ejercicio</Button>
      <input
        type="file"
        style={{ display: 'none' }}
        ref={fileInput}
        onChange={onChange}
      />
    </Fragment>
  );
};

const mapDispatch = dispatch => ({
  loadExercises: data => dispatch(saveExercises(data)),
  setExercise: id => dispatch(setExercise(id))
});

export default connect(null, mapDispatch)(withRouter(LoadExercise));
