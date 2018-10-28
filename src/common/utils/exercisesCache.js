// local storage cache for exercises

export const cacheExercises = (exercises) => {
  localStorage.setItem('exercises', JSON.stringify(exercises));
};

export const getExercisesFromCache = () =>
  JSON.parse(localStorage.getItem('exercises'));
