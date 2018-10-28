import createMemoryHistory from 'history/createMemoryHistory';

let instance;

class History {
  constructor() {
    if (!instance) {
      instance = createMemoryHistory();
    }
    return instance;
  }
}

export default new History();
