import Immutable from 'immutable';
import { createSelector } from 'reselect';

import { STATE_READY, STATE_LOADING, STATE_LOADED, STATE_ERROR } from 'constants/constants';
import ExerciseApi from 'api/exerciseApi';
import { cacheExercises, getExercisesFromCache } from 'utils/exercisesCache';

// ACTION TYPES
const EXERCISES_REQUESTED = 'EXERCISES_REQUESTED';
const EXERCISES_RECEIVED = 'EXERCISES_RECEIVED';
const EXERCISES_ERROR = 'EXERCISES_ERROR';
const SET_EXERCISE = 'SET_EXERCISE';

// ACTIONS
const exercisesRequested = () => ({
  type: EXERCISES_REQUESTED
});

const exercisesReceived = exercises => ({
  exercises,
  type: EXERCISES_RECEIVED
});

const exercisesError = () => ({
  type: EXERCISES_ERROR
});

export const setExercise = id => ({
  id,
  type: SET_EXERCISE
});

// ACTION CREATORS
export const fetchExercises = () => (dispatch) => {
  dispatch(exercisesRequested());

  ExerciseApi.getExercises().then((data) => {
    dispatch(exercisesReceived(data));
    cacheExercises(data);
  }).catch(() => {
    const data = getExercisesFromCache();
    if (data) {
      dispatch(exercisesReceived(data));
    } else {
      dispatch(exercisesError());
    }
  });
};

export const saveExercises = data => (dispatch) => {
  dispatch(exercisesReceived(data));
};

// SELECTORS
export const getExercises = createSelector(
  state => state.getIn(['exercise', 'exercises']),
  exercises => exercises.toJS().reverse()
);

export const getCurrentExercise = createSelector(
  getExercises,
  state => state.getIn(['exercise', 'currentExercise']),
  (exercises, currentExerciseId) =>
    exercises.find(({ id }) => id === currentExerciseId)
);

// INITIAL STATE
const initialState = Immutable.fromJS({
  exercises: [],
  state: STATE_READY,
  currentExercise: undefined
});

// REDUCER
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case EXERCISES_REQUESTED: {
      return state.set('state', STATE_LOADING);
    }
    case EXERCISES_RECEIVED: {
      const { exercises } = action;
      const newState = state.set('exercises', Immutable.fromJS(exercises));
      return newState.set('state', STATE_LOADED);
    }
    case EXERCISES_ERROR: {
      return state.set('state', STATE_ERROR);
    }
    case SET_EXERCISE: {
      const { id } = action;
      return state.set('currentExercise', id);
    }
    default: {
      return state;
    }
  }
};

export default reducer;
