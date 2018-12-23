
import React, { PureComponent } from 'react';
import { object } from 'prop-types';
import throttle from 'lodash/throttle';

// Component that sets a min height using children height
export default class FreezeHeight extends PureComponent {
  static propTypes = {
    children: object.isRequired,
  }

  state = { minHeight: 0 }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.updateHeight();
  }

  componentDidUpdate() {
    this.updateHeight();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  itemRef = React.createRef();

  updateHeight = () => {
    if (this.itemRef) {
      const { clientHeight } = this.itemRef.current;
      const { minHeight } = this.state;
      if (clientHeight !== minHeight) {
        this.setState({ minHeight: clientHeight });
      }
    }
  }

  handleResize = throttle(this.updateHeight, 100)

  render() {
    const { children } = this.props;
    const { minHeight } = this.state;

    return (
      <div
        ref={this.itemRef}
        style={{ minHeight }}
      >
        {children}
      </div>
    );
  }
}
