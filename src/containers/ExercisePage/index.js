import React, { PureComponent } from 'react';
import { object } from 'prop-types';

import Exercise from '../../components/exercises/Exercise';
import withHeader from '../../components/hoc/withHeader';

class ExercisePage extends PureComponent {
  static propTypes = {
    location: object.isRequired
  }

  render() {
    const { location: { state: { exercise } } } = this.props;

    return (
      <div className="exercise-page">
        <Exercise exercise={exercise} />
      </div>
    );
  }
}

export default withHeader(ExercisePage);
