import React, { Component } from 'react';
import { bool, string, func } from 'prop-types';
import { DragSource } from 'react-dnd';
import styled from 'styled-components';

const boxSource = {
  beginDrag(props) {
    return {
      palabra: props.palabra,
    };
  }
};

const PalabraText = styled.div`
  border: 1px dashed gray;
  background-color: ${({ backgroundColor }) => backgroundColor};
  padding: 5px 10px;
  cursor: move;
  color: rgba(0,0,0,0.8);
  opacity: ${({ opacity }) => opacity};
`;

class Palabra extends Component {
  static propTypes = {
    palabra: string.isRequired,
    submitted: bool.isRequired,
    isDragging: bool.isRequired,
    connectDragSource: func.isRequired,
    hasError: bool,
  }

  getBackgroundColor = () => {
    const { hasError, submitted } = this.props;
    if (!submitted) {
      return 'white';
    }
    return hasError ? '#ffb3b3' : '#16c41673';
  }

  render() {
    const {
      palabra,
      isDragging,
      connectDragSource,
    } = this.props;
    const opacity = isDragging ? 0.4 : 1;
    const Component =
      <div>
        <PalabraText
          backgroundColor={this.getBackgroundColor()}
          opacity={opacity}
        >
          {palabra}
        </PalabraText>
      </div>;

    return connectDragSource(Component);
  }
}

export default DragSource(
  props => props.palabra,
  boxSource,
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }),
)(Palabra);
