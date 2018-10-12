import api from './apiService';

class Exercise {
  static getExercises() {
    return api.get('/ejercicios');
  }
}

export default Exercise;
