import React, { Component } from 'react';
import { bool, func, object, string, array } from 'prop-types';
import { DropTarget } from 'react-dnd';

import Palabra from './Palabra';
import Box from './Box';
import BoxCategoryTitle from './BoxCategoryTitle';
import BoxSlot from './BoxSlot';

const boxTarget = {
  drop(props, monitor) {
    props.onDrop(monitor.getItem());
  },
};

class Category extends Component {
  static propTypes = {
    canDrop: bool.isRequired,
    isOver: bool.isRequired,
    connectDropTarget: func.isRequired,
    category: string.isRequired,
    palabrasCategoria: array.isRequired,
    result: object.isRequired,
    submitted: bool.isRequired
  }

  render() {
    const {
      canDrop,
      isOver,
      connectDropTarget,
      category,
      palabrasCategoria,
      result,
      submitted,
    } = this.props;
    const isActive = canDrop && isOver;

    const Component =
      <div>
        <Box isActive={isActive} canDrop={canDrop}>
          <BoxCategoryTitle>{category}</BoxCategoryTitle>
          {palabrasCategoria.map(palabra =>
            <BoxSlot key={palabra}>
              <Palabra
                palabra={palabra}
                hasError={!result[palabra]}
                hasSuccess={result[palabra]}
                submitted={submitted}
              />
            </BoxSlot>)}
        </Box>
      </div>;

    return connectDropTarget(Component);
  }
}

export default DropTarget(
  props => props.palabras,
  boxTarget,
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  }),
)(Category);
